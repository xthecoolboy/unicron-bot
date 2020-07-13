const fs = require('fs').promises;
const path = require('path');
const express = require('express');
const rateLimit = require('express-rate-limit');
const { promisify } = require('util');
const BaseEvent = require('../../classes/BaseEvent');
const Endpoint = require('./Endpoint');
const EventEmitter = require('events').EventEmitter;
const { ShardingManager, User, Guild } = require('discord.js');
const GuildManager = require('../../managers/GuildManager');
const UserManager = require('../../managers/UserManager');
const POSTManager = require('../../managers/POSTManager');

module.exports = class Server extends EventEmitter {
    /**
     * 
     * @param {ShardingManager} manager 
     */
    constructor(manager) {
        super();
        this.manager = manager;
        this.utils = require('../../utils/');
        this.logger = this.utils.Logger;
        this.wait = promisify(setTimeout);
        this.database = {
            users: new UserManager(this, {}),
            guilds: new GuildManager(this, {}),
        }
        this.poster = new POSTManager(this, {});
    }
    /**
     * @returns {Promise<number>}
     * @param {"users"|"guilds"} props 
     */
    async getCount(props) {
        if (props === 'users') {
            const raw = await this.manage.broadcastEval(`this.guilds.cache.reduce((acc, cur) => acc + cur.memberCount, 0)`);
            return raw.reduce((acc, cur) => acc + cur, 0);
        } else if (props === 'guilds') {
            const raw = await this.manager.broadcastEval(`this.guilds.cache.size`);
            return raw.reduce((acc, cur) => acc + cur, 0);
        } return 0;
    }
    /**
     * @returns {Promise<User>}
     * @param {string} user_id 
     */
    fetchUser(user_id) {
        return new Promise(async (resolve, reject) => {
            const fetched = await this.manager.broadcastEval(`
            (async function(){
                if (this.shard.id === 0) {
                    const user = await this.users.fetch(${user_id}).catch(() => { });
                    return user;
                }
            })();
            `);
            const user = fetched.find(u => u);
            return resolve(user ? user : null);
        });
    }
    /**
     * @returns {Promise<Guild>}
     * @param {string} guild_id 
     */
    fetchGuild(guild_id) {
        return new Promise(async (resolve, reject) => {
            const fetched = await this.manager.broadcastEval(`
            (async function(){
                if (this.shard.id === 0) {
                    const guild = await this.guilds.fetch(${guild_id}).catch(() => { });
                    if (guild) return guild;
                }
            })();
            `);
            const guild = fetched.find(u => u);
            return resolve(guild ? guild : null);
        });
    }
    /**
     * @brief Register stufss
     * @param {string} path 
     */
    async register() {
        this.app = express();
        this.app.use(rateLimit({
            windowMs: 60000,
            max: 50,
            message: {
                message: 'Too Many Requests'
            }
        }));
        this.app.use(express.json());
        this.app.get('/', (req, res) => {
            res.status(200).send({
                gateway: '/api/v1/',
                author: 'oadpoaw'
            });
        });
        await this.registerEndpoints('../routes');
        await this.registerEvents('../events');
    }
    /**
     * @private
     * @param {string} dir 
     */
    async registerEndpoints(dir) {
        const filePath = path.join(__dirname, dir);
        const files = await fs.readdir(filePath);
        for await (const file of files) {
            if (file.endsWith('.js')) {
                const endpoint = require(path.join(filePath, file));
                if (endpoint.prototype instanceof Endpoint) {
                    const instance = new endpoint(this);
                    this.logger.info(`Route '${instance.url}' loaded.`);
                    this.app.use(instance.url, instance.createRoute());
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
     * 
     * @param {string } dir 
     */
    async registerEvents(dir) {
        const filePath = path.join(__dirname, dir);
        const files = await fs.readdir(filePath);
        for (const file of files) {
            if (file.endsWith('.js')) {
                const Event = require(path.join(filePath, file));
                if (Event.prototype instanceof BaseEvent) {
                    const instance = new Event();
                    this.logger.info(`'${instance.eventName}' server event loaded.`)
                    this.on(instance.eventName, instance.run.bind(instance, this));
                }
                delete require.cache[require.resolve(path.join(filePath, file))];
            }
        }
    }
    /**
     * 
     * @param {number} port 
     */
    login(port = 4200) {
        return new Promise(async (resolve, reject) => {
            try {
                this.port = port || 4200;
                this.app.listen(port, () => {
                    this.logger.info(`API Server Running on port ${this.port}`);
                });
                const ids = await this.manager.broadcastEval(`this.user.id`);
                this.id = ids.shift();
                return resolve(port);
            } catch (e) {
                reject(e);
            }
        });
    }
}