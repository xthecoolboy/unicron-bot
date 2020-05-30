
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
        name: 'softban',
        description: 'Ban someone from the server and immediately unban!',
        permission: 'Server Moderator',
    },
    options: {
        aliases: [],
        clientPermissions: ['BAN_MEMBERS', 'MANAGE_MEMBERS'],
        cooldown: 10,
        nsfwCommand: false,
        args: true,
        usage: 'softban [UserMention|UserID|UserTag]',
        donatorOnly: false,
        premiumServer: false,
    }
}