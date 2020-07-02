const Client = require('./Unicron');
const { Message } = require('discord.js');
module.exports = class {
    /**
     * 
     * @param {Object} props 
     * 
     * @param {Object} props.config
     * @param {String} props.config.id
     * @param {String} props.config.displayname
     * @param {String} props.config.description
     * 
     * @param {Object} props.options
     * @param {Boolean} props.options.buyable
     * @param {Boolean} props.options.sellable
     * @param {Boolean} props.options.usable
     * @param {Number} props.options.price
     * @param {Number} props.options.cost
     */
    constructor(props) {
        this.config = props.config;
        this.options = props.options;
    }
    /**
     * @returns {Promise<Boolean|Message>}
     * @param {Client} client 
     * @param {Message} message 
     */
    async run(client, message) {}
}