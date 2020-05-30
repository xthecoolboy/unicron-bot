
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
        name: 'purge',
        description: 'Purge messages from a user or even more!',
        permission: 'Server Moderator',
    },
    options: {
        aliases: [],
        clientPermissions: ['MANAGE_MESSAGES'],
        cooldown: 10,
        nsfwCommand: false,
        args: true,
        usage: 'purge [amount]\npurge 10 [UserMention|UserID]',
        donatorOnly: false,
        premiumServer: false,
    }
}