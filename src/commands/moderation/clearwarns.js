
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
        name: 'clearwarns',
        description: 'Clear warnings of a specific user!',
        permission: 'Server Moderator',
    },
    options: {
        aliases: ['clearwarnings'],
        clientPermissions: [],
        cooldown: 10,
        nsfwCommand: false,
        args: true,
        usage: 'clearwarns [UserMention|UserID]',
        donatorOnly: false,
        premiumServer: false,
    }
}