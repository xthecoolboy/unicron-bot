const Emotes = require('../../assets/Emotes.json');
const crypto = require('crypto')
const fs = require('fs').promises;
const path = require('path');
const { inspect, promisify } = require('util');

const { Client, Collection, Message, MessageEmbed, Emoji, Guild, GuildEmoji } = require('discord.js');

const Unicron = require('../handlers/Unicron');
const BaseCommand = require('./BaseCommand');
const BaseItem = require('./BaseItem');
const BaseEvent = require('./BaseEvent');

const UserManager = require('../managers/UserManager');
const GuildManager = require('../managers/GuildManager');
const PermissionManager = require('../managers/PermissionManager');
const POSTManager = require('../managers/POSTManager');

const options = require('../utils/Constants');

module.exports = class UnicronClient extends Client {
    constructor() {
        super({
            partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
            messageCacheMaxSize: 100,
            messageSweepInterval: 30,
        });
        this.unicron = new Unicron(options.unicron)
        this.commands = new Collection();
        this.events = new Collection();
        this.shopitems = new Collection();
        this.botEmojis = new Collection();
        this.utils = require('../utils/');
        this.logger = this.utils.Logger;
        this.wait = promisify(setTimeout);
        this.database = {
            users: new UserManager(this, options.managers.users),
            guilds: new GuildManager(this, options.managers.guilds),
        }
        this.permission = new PermissionManager(this, {});
        this.poster = new POSTManager(this, {});
    }
    /**
     * @returns {Promise<Emoji>}
     * @param {String} name 
     */
    getEmoji(name) {
        if (this.botEmojis.has(name)) return this.botEmojis.get(name);
        function findEmoji(id) {
            const temp = this.emojis.cache.get(id);
            if (!temp) return null;
            const emoji = Object.assign({}, temp);
            if (emoji.guild) emoji.guild = emoji.guild.id;
            emoji.require_colons = emoji.requiresColons;
            return emoji;
        }
        return new Promise(async (resolve, reject) => {
            return resolve(
                await this.shard.broadcastEval(`(${findEmoji}).call(this, '${Emotes[name]}')`)
                    .then((arr) => {
                        const femoji = arr.find(emoji => emoji);
                        if (!femoji) return null;
                        return this.api.guilds(femoji.guild)
                            .get()
                            .then(raw => {
                                const guild = new Guild(this, raw);
                                const emoji = new GuildEmoji(this, femoji, guild);
                                this.botEmojis.set(name, emoji);
                                return emoji;
                            });
                    })
            );
        });
    }
    /**
     * 
     * @param {Message} message 
     * @param {String|MessageEmbed} question 
     * @param {Number} limit millieseconds
     * @param {Boolean} obj Put `true` to return the message class instead of returning the message content
     * 
     * @returns {Promise<Boolean|String|Message>}
     */
    async awaitReply(message, question, limit = 60000, obj = false) {
        const filter = m => m.author.id === message.author.id;
        await message.channel.send(question);
        try {
            const collected = await message.channel.awaitMessages(filter, { max: 1, time: limit, errors: ['time'] });
            if (obj) return collected.first();
            return collected.first().content;
        } catch (e) {
            return false;
        }
    }
    /**
     * @returns {Promise<String>|String}
     * @param {Promise<String>} text 
     */
    async clean(text) {
        if (text && text.constructor && text.constructor.name == 'Promise') text = await text;
        if (typeof text !== 'string') text = inspect(text, { depth: 1 });
        text = text.replace(/`/g, '`' + String.fromCharCode(8203))
            .replace(/@/g, '@' + String.fromCharCode(8203))
            .replace(this.token, '12u32i1h32 FUCK YOU 12h3i1ih32');
        return text;
    }
    /**
     * @returns {Boolean|String} if an error occured
     * @param {String} itemName 
     */
    registerItem(dir) {
        try {
            const Item = require(dir);
            if (Item.prototype instanceof BaseItem) {
                const props = new Item();
                this.shopitems.set(props.config.id, props);
            }
            return false;
        } catch (e) {
            return `Unable to load item ${dir}: ${e}`;
        }
    }
    /**
     * 
     * @param {String} dir 
     */
    async registerItems(dir) {
        const filePath = path.join(__dirname, dir);
        const files = await fs.readdir(filePath);
        for (const file of files) {
            if (file.endsWith('.js')) {
                const response = this.registerItem(path.join(filePath, file));
                if (response) this.logger.error(response);
            }
        }
    }
    /**
     * @returns {Boolean|String}
     * @param {String} itemName 
     */
    unregisterItem(itemName) {
        const item = this.shopitems.get(itemName);
        if (!item) return `The item \`${itemName}\` doesn\'t seem to exists. Try again!`;
        this.shopitems.delete(itemName);
        const mod = require.cache[require.resolve(`../items/${item.config.id}`)];
        delete require.cache[require.resolve(`../items/${item.config.id}.js`)];
        for (let i = 0; i < mod.parent.children.length; i++) {
            if (mod.parent.children[i] === mod) {
                mod.parent.children.splice(i, 1);
                break;
            }
        }
        return false;
    }
    /**
     * @returns {String|Boolean}
     * @param {String} dir
     */
    registerCommand(dir, category) {
        try {
            const Command = require(dir);
            if (Command.prototype instanceof BaseCommand) {
                const props = new Command();
                props.config.category = category;
                this.commands.set(props.config.name, props);
            }
            return false;
        } catch (e) {
            return `Unable to load command ${dir}: ${e}`;
        }
    }
    /**
     * 
     * @param {String} dir 
     */
    async registerCommands(dir) {
        const filePath = path.join(__dirname, dir);
        const files = await fs.readdir(filePath);
        for (const file of files) {
            const filesPath = path.join(filePath, file);
            const commands = await fs.readdir(filesPath);
            for (const command of commands) {
                if (command.endsWith('.js')) {
                    const response = this.registerCommand(path.join(filesPath, command), file);
                    if (response) this.logger.error(response);
                }
            }
        }
    }
    /**
     * @returns {String}
     * @param {String} str 
     */
    escapeRegex(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    /**
     * @returns {String}
     * @param {String} str 
     */
    trim(str, max) {
        return (str.length > max) ? `${str.slice(0, max - 3)}...` : str;
    }
    /**
     * @returns {Array<Array<Any>>}
     * @param {Array} array 
     * @param {Number} chunkSize 
     */
    chunk(array, chunkSize = 0) {
        return array.reduce(function (previous, current) {
            let chunk;
            if (previous.length === 0 || previous[previous.length - 1].length === chunkSize) {
                chunk = [];
                previous.push(chunk);
            }
            else {
                chunk = previous[previous.length - 1];
            }
            chunk.push(current);
            return previous;
        }, []);
    }
    /**
     * 
     * @param {String} dir 
     */
    async registerEvents(dir) {
        const filePath = path.join(__dirname, dir);
        const files = await fs.readdir(filePath);
        for (const file of files) {
            if (file.endsWith('.js')) {
                const Event = require(path.join(filePath, file));
                if (Event.prototype instanceof BaseEvent) {
                    const instance = new Event();
                    this.on(instance.eventName.split('.')[0], instance.run.bind(instance, this));
                }
                delete require.cache[require.resolve(path.join(filePath, file))];
            }
        }
    }
    /**
     * @returns {Promise<Number>}
     * @param {String} props
     */
    async getCount(props = 'guilds' || 'users') {
        return this.shard.fetchClientValues(`${props}.cache.size`).then((results) => results.reduce((prev, cur) => prev + cur, 0));
    }
    /**
     * @returns {Array<any>}
     * @param {Array<any>} arr 
     * @param {Number} maxLen 
     */
    trimArray(arr, maxLen = 10) {
        if (arr.length > maxLen) {
            const len = arr.length - maxLen;
            arr = arr.slice(0, maxLen);
            arr.push(`${len} more...`);
        }
        return arr;
    }
    list(arr, conj = 'and') {
        const len = arr.length;
        if (len === 0) return '';
        if (len === 1) return arr[0];
        return `${arr.slice(0, -1).join(', ')}${len > 1 ? `${len > 2 ? ',' : ''} ${conj} ` : ''}${arr.slice(-1)}`;
    }

    shorten(text, maxLen = 2000) {
        return text.length > maxLen ? `${text.substr(0, maxLen - 3)}...` : text;
    }

    removeDuplicates(arr) {
        if (arr.length === 0 || arr.length === 1) return arr;
        const newArr = [];
        for (let i = 0; i < arr.length; i++) {
            if (newArr.includes(arr[i])) continue;
            newArr.push(arr[i]);
        }
        return newArr;
    }

    sortByName(arr, prop) {
        return arr.sort((a, b) => {
            if (prop) return a[prop].toLowerCase() > b[prop].toLowerCase() ? 1 : -1;
            return a.toLowerCase() > b.toLowerCase() ? 1 : -1;
        });
    }

    firstUpperCase(text, split = ' ') {
        return text.split(split).map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`).join(' ');
    }

    formatNumber(number, minimumFractionDigits = 0) {
        return Number.parseFloat(number).toLocaleString(undefined, {
            minimumFractionDigits,
            maximumFractionDigits: 2
        });
    }

    formatNumberK(number) {
        return number > 999 ? `${(number / 1000).toLocaleString(undefined, { maximumFractionDigits: 1 })}K` : number;
    }

    base64(text, mode = 'encode') {
        if (mode === 'encode') return Buffer.from(text).toString('base64');
        if (mode === 'decode') return Buffer.from(text, 'base64').toString('utf8') || null;
        throw new TypeError(`${mode} is not a supported base64 mode.`);
    }
    embedURL(title, url, display) {
		return `[${title}](${url.replace(/\)/g, '%27')}${display ? ` "${display}"` : ''})`;
	}
    hash(text, algorithm) {
        return crypto.createHash(algorithm).update(text).digest('hex');
    }
}