const Client = require('./Unicron');
const { Message } = require('discord.js')
module.exports = class {
    /**
     * 
     * @param {Object} props 
     * 
     * @param {Object} props.config
     * @param {String} props.config.name - Command Name
     * @param {String} props.config.description - Command Description
     * @param {String} props.config.permission - Command Required Permisison Level
     * 
     * @param {Object} props.options
     * @param {Array<String>} props.options.aliases
     * @param {Array<String>} props.options.clientPermissions
     * @param {Number} props.options.cooldown
     * @param {Boolean} props.options.nsfwCommand
     * @param {Boolean} props.options.args
     * @param {String} props.options.usage
     * @param {Boolean} props.options.donatorOnly
     * @param {Boolean} props.options.premiumServer
     * 
     * @param {Object} props.argsDefinitions
     * @param {Object} props.argsDefinitions.
     */
    constructor(props) {
        this.options = props.options;
        this.config = props.config;
        this.argsDefinitions = props.argsDefinitions;
    }
    /**
     * @returns {Promise<Message|Boolean>}
     * @param {Client} client 
     * @param {Message} message 
     * @param {Array<String>} args
     */
    async run(client, message, args) {}
}