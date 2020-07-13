const Client = require('./Unicron');
const { Message } = require('discord.js');

module.exports = class Command {
    /**
     * 
     * @param {Object} props 
     * 
     * @param {Object} props.config
     * @param {string} props.config.name Command Name
     * @param {string} props.config.description Command Description
     * @param {"User"|"Server Moderator"|"Server Administrator"|"Server Owner"|"Bot Staff"|"Bot Owner"} props.config.permission Command Permission Level
     * 
     * @param {Object} props.options
     * @param {Array<string>} props.options.aliases
     * @param {Array<'CREATE_INSTANT_INVITE'|'KICK_MEMBERS'|'BAN_MEMBERS'|'ADMINISTRATOR'|'MANAGE_CHANNELS'|'MANAGE_GUILD'|'ADD_REACTIONS'|'VIEW_AUDIT_LOG'|'PRIORITY_SPEAKER'|'STREAM'|'VIEW_CHANNEL'|'SEND_MESSAGES'|'SEND_TTS_MESSAGES'|'MANAGE_MESSAGES'|'EMBED_LINKS'|'ATTACH_FILES'|'READ_MESSAGE_HISTORY'|'MENTION_EVERYONE'|'USE_EXTERNAL_EMOJIS'|'VIEW_GUILD_INSIGHTS'|'CONNECT'|'SPEAK'|'MUTE_MEMBERS'|'DEAFEN_MEMBERS'|'MOVE_MEMBERS'|'USE_VAD'|'CHANGE_NICKNAME'|'MANAGE_NICKNAMES'|'MANAGE_ROLES'|'MANAGE_WEBHOOKS'|'MANAGE_EMOJIS'>} props.options.clientPermissions
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
    async run(client, message, args) { }
}