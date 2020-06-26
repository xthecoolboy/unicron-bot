const Emotes = require('../../assets/Emotes.json');

const fs = require('fs').promises;
const path = require('path');
const express = require('express');
const rateLimit = require('express-rate-limit');
const { inspect, promisify } = require('util');

const { Client, Collection, Message, MessageEmbed, Emoji } = require('discord.js');

const { Poster } = require('dbots');
const Unicron = require('../handlers/Unicron');

const BaseCommand = require('./BaseCommand');
const BaseItem = require('./BaseItem');
const BaseEvent = require('./BaseEvent');
const Endpoint = require('./Endpoint');

const UserManager = require('../managers/UserManager');
const GuildManager = require('../managers/GuildManager');
const PermissionManager = require('../managers/PermissionManager');

const options = require('../utils/Constants');

module.exports = class UnicronClient extends Client {
    constructor() {
        super({
            partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
            messageCacheMaxSize: 100,
            messageSweepInterval: 30,
        });
        this.unicron = new Unicron(options.unicron)
        this.poster = new Poster(options.botlisting);
        this.commands = new Collection();
        this.events = new Collection();
        this.shopitems = new Collection();
        this.utils = require('../utils/');
        this.logger = this.utils.Logger;
        this.wait = promisify(setTimeout);
        this.database = {
            users: new UserManager(this, options.managers.users),
            guilds: new GuildManager(this, options.managers.guilds),
        }
        this.permission = new PermissionManager(this, {
            client: this,
        });
    }
    /**
     * @brief Attach something to the client
     * @param {String} path 
     */
    async register() {
        require('../listeners/process')(this);
        this.app = express();
        this.app.use((req, res, next) => {
            this.logger.info(`${req.ip} : ${req.method} - ${req.url}`, 'Client');
            next();
        })
        this.app.use(rateLimit({
            windowMs: 60000,
            max: 50,
            message: {
                message: 'Too Many Requests'
            }
        }));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.get('/', (req, res) => {
            res.status(200).send({
                gateway: '/api/v1/',
                author: 'oadpoaw'
            });
        });
        await this.registerEndpoints('../endpoints');
    }
    /**
     * @private
     * @param {String} dir 
     */
    async registerEndpoints(dir) {
        if (this.isLoaded) return;
        const filePath = path.join(__dirname, dir);
        const files = await fs.readdir(filePath);
        for await (const file of files) {
            if (file.endsWith('.js')) {
                const endpoint = require(path.join(filePath, file));
                if (endpoint.prototype instanceof Endpoint) {
                    const instance = new endpoint(this);
                    const url = '/api/v1' + instance.url;
                    this.logger.info(`API Endpoint - ${url}`);
                    this.app.use(url, instance.createRoute());
                    continue;
                }
            }
        }
        this.app.use((req, res) => {
            res.status(404).send({
                message: 'Not Found',
                status: 404,
            });
        });
    }
    /**
     * @returns {Promise<void>}
     * @param {String} token 
     * @param {Number} port 
     */
    superlogin(token, port = 4200) {
        return new Promise(async (res, rej) => {
            this.port = port;
            this.app.listen(port);
            await this.login(token);
        });
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