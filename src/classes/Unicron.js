
const { Client, Collection } = require('discord.js');
const { Poster } = require('dbots');
const Unicron = require('../handlers/Unicron').Unicron;
const { Logger } = require('../utils/');

module.exports = class extends Client {
    constructor(options) {
        super(options.clientOptions);
        this.unicron = new Unicron(options.unicron)
        this.poster = new Poster(options.botlisting);
        this.commands = new Collection();
        this.events = new Collection();
        this.shopitems = new Collection();
        this.logger = Logger;
    }
    async require(path) {
        await require(path)(this);
    }
}