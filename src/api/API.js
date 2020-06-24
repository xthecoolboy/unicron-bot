const EventEmitter = require('events').EventEmitter;
const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const rateLimit = require('express-rate-limit');
const { Logger } = require('../utils');
const Endpoint = require('./classes/Endpoint');

module.exports = class API extends EventEmitter {
    constructor(options = {}) {
        if (typeof options !== 'object') throw new Error('API Options Aint Object bud');
        super();
        this.isLoaded = false;
        this.logger = Logger;
    }
    async register() {
        if (this.isLoaded) return;
        this.app = express();
        this.app.use((req, res, next) => {
            this.logger.info(`${req.ip} : ${req.method} - ${req.url}`, 'Client');
            next();
        })
        this.app.use(rateLimit({
            windowMs: 60000,
            max: 100,
            message: {
                message: 'Too Many Requests'
            }
        }));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        await this.registerEndpoints('./endpoints');
        this.isLoaded = true;
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
                    this.app.use(instance.url, instance.createRoute());
                    continue;
                }
            }
        }
    }
    /**
     * @returns {Promise<void>}
     * @param {Number} port 
     */
    listen(port = 4200) {
        return new Promise((res, rej) => {
            try {
                this.port = port;
                this.app.listen(port);
                return res(port);
            } catch (e) {
                rej(e);
            }
        });
    }
}