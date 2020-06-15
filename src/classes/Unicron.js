const fs = require('fs').promises;
const path = require('path');
const { inspect, promisify } = require('util');
const { Client, Collection, Message, MessageEmbe, Emoji } = require('discord.js');
const Emotes = require('../../assets/Emotes.json');
const { Poster } = require('dbots');
const Unicron = require('../handlers/Unicron').Unicron;
const BaseCommand = require('../classes/BaseCommand');
const BaseItem = require('../classes/BaseItem');
const BaseEvent = require('../classes/BaseEvent');
const options = require('../options');

module.exports = class extends Client {
    constructor() {
        super(options.clientOptions);
        this.unicron = new Unicron(options.unicron)
        this.poster = new Poster(options.botlisting);
        this.commands = new Collection();
        this.events = new Collection();
        this.shopitems = new Collection();
        this.utils = require('../utils/');
        this.logger = this.utils.Logger;
        this.wait = promisify(setTimeout);
    }
    /**
     * @brief Attach something to the client
     * @param {String} path 
     */
    async register() {
        await require('../core')(this);
    }
    /**
     * @returns {Promise<Emoji>}
     * @param {String} name 
     */
    async getEmoji(name) {
        return this.emojis.cache.get(Emotes[name]);
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
     * @returns {String}
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
     * @returns {Boolean|String}
     * @param {String} commandName 
     */
    unregisterCommand(commandName) {
        const command = this.commands.get(commandName) || this.commands.find(cmd => cmd.options.aliases && cmd.options.aliases.includes(commandName));
        if (!command) return `The command \`${commandName}\` doesn\`t seem to exist, nor is it an alias. Try again!`;
        this.commands.delete(command.config.name);
        const mod = require.cache[require.resolve(`../commands/${command.config.category}/${command.config.name}`)];
        delete require.cache[require.resolve(`../commands/${command.config.category}/${command.config.name}.js`)];
        for (let i = 0; i < mod.parent.children.length; i++) {
            if (mod.parent.children[i] === mod) {
                mod.parent.children.splice(i, 1);
                break;
            }
        }
        return false;
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
            }
        }
    }
}