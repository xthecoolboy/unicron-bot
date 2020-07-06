const Client = require('./Unicron');
const { Message } = require('discord.js');
module.exports = class {
    /**
     * 
     * @param {Object} props 
     * 
     * @param {Object} props.config
     * @param {string} props.config.id
     * @param {string} props.config.displayname
     * @param {string} props.config.description
     * 
     * @param {Object} props.options
     * @param {boolean} props.options.buyable
     * @param {boolean} props.options.sellable
     * @param {boolean} props.options.usable
     * @param {number} props.options.price
     * @param {number} props.options.cost
     */
    constructor(props) {
        this.config = props.config;
        this.options = props.options;
    }
    /**
     * @returns {Promise<boolean|Message>}
     * @param {Client} client 
     * @param {Message} message 
     */
    async run(client, message) {}
}