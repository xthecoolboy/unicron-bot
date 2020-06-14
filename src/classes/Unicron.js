
const { Client, Collection, Message } = require('discord.js');
const { Poster } = require('dbots');
const Unicron = require('../handlers/Unicron').Unicron;

module.exports = class extends Client {
    constructor(options) {
        super(options.clientOptions);
        this.unicron = new Unicron(options.unicron)
        this.poster = new Poster(options.botlisting);
        this.commands = new Collection();
        this.events = new Collection();
        this.shopitems = new Collection();
        this.logger = require('../utils/').Logger;
        this.wait = require('util').promisify(setTimeout)
    }
    /**
     * @brief Attach something to the client
     * @param {String} path 
     */
    async require(path) {
        await require(path)(this);
    }
    /**
     * 
     * @param {Message} message 
     * @param {String} question 
     * @param {Number} limit millieseconds
     * @param {Boolean} obj Put `true` to return the message class instead of returning message content
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
        if (typeof text !== 'string') text = require('util').inspect(text, { depth: 1 });
        text = text.replace(/`/g, '`' + String.fromCharCode(8203))
            .replace(/@/g, '@' + String.fromCharCode(8203))
            .replace(this.token, '12u32i1h32 FUCK YOU 12h3i1ih32');
        return text;
    }
    /**
     * @returns {Boolean|String} if an error occured
     * @param {String} itemName 
     */
    loadItem(itemName) {
        try {
            const props = require(`../items/${itemName}`);
            this.shopitems.set(`${props.config.id}`, props);
            return false;
        } catch (e) {
            return `Unable to load item ${itemName}: ${e}`;
        }
    }
    /**
     * @returns {Boolean|String}
     * @param {String} itemName 
     */
    unloadItem(itemName) {
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
     * @param {String} commandName 
     * @param {String} category 
     */
    loadCommand(commandName, category) {
        try {
            const props = require(`../commands/${category}/${commandName}`);
            props.config.category = category;
            this.commands.set(props.config.name, props);
            return false;
        } catch (e) {
            return `Unable to load command ${commandName}: ${e}`;
        }
    }
    /**
     * @returns {Boolean|String}
     * @param {String} commandName 
     */
    unloadCommand(commandName) {
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
     * @returns {Array}
     * @param {Array} array 
     * @param {Number} chunkSize 
     */
    chunk(array, chunkSize = 0) {
        return array.reduce(function (previous, current) {
            let chunk;
            if (previous.length === 0 ||
                previous[previous.length - 1].length === chunkSize) {
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
}