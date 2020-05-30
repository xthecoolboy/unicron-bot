
const Discord = require('discord.js');

module.exports = {
    /**
     * 
     * @param {Discord.Client} client Client
     * @param {Discord.Message} message Message
     * @param {Array} args Arguments
     */
    run: async function (client, message, args) {

    },
    config: {
        name: 'ban',
        description: 'Ban a member from the server!',
        permission: 'Server Moderator',
    },
    options: {
        aliases: [],
        clientPermissions: ['BAN_MEMBERS'],
        cooldown: 10,
        nsfwCommand: false,
        args: true,
        usage: 'ban [UserMention|UserID|UserTag] [...Reason]\nban [UserMention|UserID|UserTag] [time][s|m|h|d] [...Reason]',
        donatorOnly: false,
        premiumServer: false,
    }
}