
const { Collection } = require('discord.js');
const Client = require('./Unicron');

module.exports = class BaseManager {
    /**
     * 
     * @param {Client} client 
     * @param {Object} options 
     * @param {Object} options.
     */
    constructor(client, options) {
        this.client = client;
        this.options = options;
        this.cache = new Collection();
    }
}