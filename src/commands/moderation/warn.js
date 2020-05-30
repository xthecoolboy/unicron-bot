
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
        name: 'warn',
        description: 'Warn a member from the server!',
        permission: 'Server Moderator',
    },
    options: {
        aliases: [],
        clientPermissions: [],
        cooldown: 10,
        nsfwCommand: false,
        args: true,
        usage: 'warn [UserMention|UserID|UserTag] [...Reason]\nwarn [UserMention|UserID|UserTag] [Time] [...Reason]',
        donatorOnly: false,
        premiumServer: false,
    }
}