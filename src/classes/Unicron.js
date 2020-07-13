const { Client: DiscordClient, Collection,
    Message, MessageEmbed, Emoji, Guild,
    GuildEmoji, User, Channel, Role, GuildMember
} = require('discord.js');
const { promisify } = require('util');
const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');
const { Admin } = require('../database/database.js');
const Emotes = require('../../assets/Emotes.json');
const BaseCommand = require('./BaseCommand');
const BaseItem = require('./BaseItem');
const BaseEvent = require('./BaseEvent');
const UserManager = require('../managers/UserManager');
const GuildManager = require('../managers/GuildManager');
const PermissionManager = require('../managers/PermissionManager');
const POSTManager = require('../managers/POSTManager');

class Client extends DiscordClient {
    constructor() {
        super({
            partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
            messageCacheMaxSize: 100,
            messageSweepInterval: 30,
        });
        this.commands = new Collection();
        this.shopitems = new Collection();
        this.botEmojis = new Collection();
        this.unicron = {
            owner: process.env.BOT_OWNER_ID,
            serverInviteURL: process.env.BOT_SERVER_URL,
            channel: process.env.BOT_CHANNEL_ID,
            data: new Collection(),
            /**
             * @returns {Promise<JSON|typeof Admin>}
             * @param {string} table 
             * @param {boolean} model if true, returns the actuall model instance
             */
            database: function (table, model = false) {
                return new Promise(async (resolve, reject) => {
                    if (this.data.has(table)) return resolve(model ? this.data.get(table) : this.data.get(table).data);
                    let data = await Admin.findOne({ where: { table: table } });
                    if (!data) data = await Admin.create({ table });
                    this.data.set(table, data);
                    return resolve(model ? this.data.get(table) : this.data.get(table).data);
                });
            }
        }
        this.utils = require('../utils/');
        this.logger = this.utils.Logger;
        this.wait = promisify(setTimeout);
        this.database = {
            users: new UserManager(this),
            guilds: new GuildManager(this),
        }
        this.permission = new PermissionManager(this);
        this.poster = new POSTManager(this);
    }
    /**
     * @returns {Promise<User>|null}
     * @param {string} search
     */
    async resolveUser(search) {
        if (!search || typeof search !== 'string') return null;
        let user = null;
        if (search.match(/^<@!?(\d+)>$/)) user = await this.users.fetch(search.match(/^<@!?(\d+)>$/)[1]).catch(() => { });
        if (search.match(/^!?(\w+)#(\d+)$/) && !user) user = this.users.cache.find((u) => u.username === search.match(/^!?(\w+)#(\d+)$/)[0] && u.discriminator === search.match(/^!?(\w+)#(\d+)$/)[1]);
        if (search.match(/.{2,32}/) && !user) user = this.users.cache.find((u) => u.username === search);
        if (!user) user = await this.users.fetch(search).catch(() => { });
        return user;
    }
    /**
     * @returns {Promise<GuildMember>|null}
     * @param {string} search 
     * @param {Guild} guild 
     */
    async resolveMember(search, guild) {
        if (!search || typeof search !== 'string') return null;
        const user = await this.resolveUser(search);
        if (!user) return null;
        return await guild.members.fetch(user);
    }
    /**
     * @returns {Role|null}
     * @param {string} search
     * @param {Guild} guild 
     */
    resolveRole(search, guild) {
        if (!search || typeof search !== 'string') return null;
        let role = null;
        if (search.match(/^<@&!?(\d+)>$/)) role = guild.roles.cache.get(search.match(/^<@&!?(\d+)>$/)[1]);
        if (!role) role = guild.roles.cache.find((r) => r.name === search);
        if (!role) role = guild.roles.cache.get(search);
        return role;
    }
    /**
     * @returns {Channel|null}
     * @param {string} search
     * @param {Guild} guild
     */
    resolveChannel(search, guild) {
        if (!search || typeof search !== 'string') return null;
        let channel = null;
        if (search.match(/^<@#!?(\d+)>$/)) channel = guild.channels.cache.get(search.match(/^<@#!?(\d+)>$/)[1]);
        if (!channel) channel = guild.channels.cache.find((c) => c.name === search);
        if (!channel) channel = guild.channels.cache.get(search);
        return channel;
    }
    /**
     * 
     * @param {string} status 
     * @param {string} activity 
     * @param {string} message 
     */
    async presence(status, activity, message) {
        this.shard.broadcastEval(`
            this.user.setPresence({
                status: ['online', 'idle', 'dnd', 'invisible'].includes(${status}) ? ${status} : 'online',
                activity: {
                    type: ['PLAYING', 'STREAMING', 'LISTENING', 'WATCHING'].includes(${activity.toUpperCase()}) ? ${activity.toUpperCase()} : 'PLAYING',
                    name: ${message},
                }
            });
        `)
    }
    /**
     * @returns {Promise<Emoji>}
     * @param {string} name 
     */
    getEmoji(name) {
        if (!process.argv.includes('--shard')) return this.emojis.cache.get(Emotes[name]);
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
     * @param {string|MessageEmbed} question 
     * @param {number} [limit=60000] millieseconds
     * @param {boolean} [obj=false] Put `true` to return the message class instead of returning the message content
     * 
     * @returns {Promise<boolean|string|Message>}
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
     * @private
     * @returns {boolean|string} if an error occured
     * @param {string} itemName 
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
     * @param {string} dir 
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
     * @private
     * @returns {string|boolean}
     * @param {string} dir
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
     * @param {string} dir 
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
     * 
     * @param {string} dir 
     */
    async registerEvents(dir) {
        const filePath = path.join(__dirname, dir);
        const files = await fs.readdir(filePath);
        for (const file of files) {
            if (file.endsWith('.js')) {
                const Event = require(path.join(filePath, file));
                if (Event.prototype instanceof BaseEvent) {
                    const instance = new Event();
                    this.on(instance.eventName, instance.run.bind(instance, this));
                }
                delete require.cache[require.resolve(path.join(filePath, file))];
            }
        }
    }
    /**
     * @returns {Promise<number>}
     * @param {'guilds'|'users'} props
     */
    async getCount(props) {
        if (!process.argv.includes('--shard')) {
            if (props === 'users') return this.guilds.cache.reduce((acc, cur) => acc + cur.memberCount, 0);
            return this[props].cache.size;
        }
        if (props === 'users') {
            const raw = await this.shard.broadcastEval(`this.guilds.cache.reduce((acc, cur) => acc + cur.memberCount, 0)`);
            return raw.reduce((acc, cur) => acc + cur, 0);
        }
        return await this.shard.fetchClientValues(`${props}.cache.size`).then((results) => results.reduce((prev, cur) => prev + cur, 0));
    }

    /**
     * @returns {Array<any>}
     * @param {Array<any>} arr 
     * @param {number} maxLen 
     */
    trimArray(arr, maxLen = 10) {
        if (arr.length > maxLen) {
            arr = arr.slice(0, maxLen);
            arr.push(`${arr.length - maxLen} more...`);
        }
        return arr;
    }
    /**
     * 
     * @param {string} text 
     * @param {number} [maxLen=2000]
     */
    shorten(text, maxLen = 2000) {
        return text.length > maxLen ? `${text.substr(0, maxLen - 3)}...` : text;
    }
    /**
     * 
     * @param {number} number 
     * @param {number} [minimumFractionDigits=0] 
     */
    formatNumber(number, minimumFractionDigits = 0) {
        return Number.parseFloat(number).toLocaleString(undefined, {
            minimumFractionDigits,
            maximumFractionDigits: 2
        });
    }
    /**
     * 
     * @param {string} text 
     * @param {"encode"|"decode"} mode 
     */
    base64(text, mode = 'encode') {
        if (mode === 'encode') return Buffer.from(text).toString('base64');
        if (mode === 'decode') return Buffer.from(text, 'base64').toString('utf8') || null;
        return null;
    }
    /**
     * 
     * @param {string} title 
     * @param {string} url 
     * @param {string} display 
     */
    embedURL(title, url, display) {
        return `[${title}](${url.replace(/\)/g, '%27')}${display ? ` "${display}"` : ''})`;
    }
    /**
     * 
     * @param {string} text 
     * @param {"sha256"|"md5"|"sha1"|"sha512"} algorithm 
     */
    hash(text, algorithm) {
        return crypto.createHash(algorithm).update(text).digest('hex');
    }
    /**
     * 
     * @param {string} str 
     */
    escapeRegex(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    /**
     * @returns {Array<Array>}
     * @param {Array} array 
     * @param {number} [chunkSize=0] 
     */
    chunk(array, chunkSize = 0) {
        if (!Array.isArray(array)) throw new Error('First Parameter must be an array');
        return array.reduce((previous, current) => {
            let chunk;
            if (previous.length === 0 || previous[previous.length - 1].length === chunkSize) {
                chunk = [];
                previous.push(chunk);
            } else {
                chunk = previous[previous.length - 1];
            }
            chunk.push(current);
            return previous;
        }, []);
    }
    /**
     * @returns {string|Array<any>|null}
     * @param {string|Array<any>} obj 
     */
    shuffle(obj) {
        if (!obj) return null;
        if (Array.isArray(obj)) {
            let i = obj.length;
            while (i) {
                let j = Math.floor(Math.random() * i);
                let t = obj[--i];
                obj[i] = obj[j];
                obj[j] = t;
            }
            return obj;
        }
        if (typeof obj === 'string') return this.shuffle(obj.split('')).join('');
        return obj;
    }
}

module.exports = Client;