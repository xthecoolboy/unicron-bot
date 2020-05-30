
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
        name: 'warnings',
        description: 'View warnings of a server member!',
        permission: 'User',
    },
    options: {
        aliases: ['warns'],
        clientPermissions: [],
        cooldown: 10,
        nsfwCommand: false,
        args: false,
        usage: 'warnings [UserMention|UserID|UserTag]',
        donatorOnly: false,
        premiumServer: false,
    }
}