const fs = require('fs').promises;
const path = require('path');
const express = require('express');
const rateLimit = require('express-rate-limit');
const { promisify } = require('util');
const BaseEvent = require('../../classes/BaseEvent');
const Endpoint = require('./Endpoint');

const EventEmitter = require('events').EventEmitter;

module.exports = class Server extends EventEmitter {
    constructor() {
        super();
        this.utils = require('../../utils/');
        this.logger = this.utils.Logger;
        this.wait = promisify(setTimeout);
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
        await this.registerEndpoints('../endpoints');
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
                    const url = '/api/v1' + instance.url;
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
                return resolve(port);
            } catch (e) {
                reject(e);
            }
        });
    }
}