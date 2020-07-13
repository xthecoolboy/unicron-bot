
const { Collection } = require('discord.js');

module.exports = class BaseManager {
    /**
     * 
     * @param {Object<string, any>} options
     */
    constructor(client, options) {
        this.client = client;
        this.options = options;
        this.cache = new Collection();
    }
}