
const { Collection } = require('discord.js');

module.exports = class BaseManager {
    constructor(client, options) {
        this.client = client;
        this.options = options;
        this.cache = new Collection();
    }
}