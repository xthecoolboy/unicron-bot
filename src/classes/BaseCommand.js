const Client = require('./Unicron');
const { Message } = require('discord.js')
module.exports = class Command {
    /**
     * 
     * @param {Object} props 
     * 
     * @param {Object} props.config
     * @param {string} props.config.name Command Name
     * @param {string} props.config.description Command Description
     * @param {string} props.config.permission Command Permission Level
     * 
     * @param {Object} props.options
     * @param {Array<string>} props.options.aliases
     * @param {Array<string>} props.options.clientPermissions
     * @param {number} props.options.cooldown
     * @param {boolean} props.options.nsfwCommand
     * @param {boolean} props.options.args
     * @param {string} props.options.usage
     * @param {boolean} props.options.donatorOnly
     * @param {boolean} props.options.premiumServer
     * 
     * @param {Object<string, any>} props.argsDefinitions
     */
    constructor(props) {
        this.options = props.options;
        this.config = props.config;
        this.argsDefinitions = props.argsDefinitions;
    }
    /**
     * @returns {Promise<Message|boolean>}
     * @param {Client} client 
     * @param {Message} message 
     * @param {Array<string>} args
     */
    async run(client, message, args) {}
}