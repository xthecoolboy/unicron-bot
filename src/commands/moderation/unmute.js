
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
        name: 'unmute',
        description: 'Unmute a muted member from the server!',
        permission: 'Server Moderator',
    },
    options: {
        aliases: [],
        clientPermissions: ['MANAGE_ROLES', 'MANAGE_MEMBERS'],
        cooldown: 10,
        nsfwCommand: false,
        args: true,
        usage: 'unmute [UserMention|UserID|UserTag]',
        donatorOnly: false,
        premiumServer: false,
    }
}