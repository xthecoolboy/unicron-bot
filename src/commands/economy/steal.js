
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
        name: 'steal',
        description: 'Steal coins from an another user!',
        permission: 'User',
    },
    options: {
        aliases: ['rob'],
        clientPermissions: [],
        cooldown: 180000,
        nsfwCommand: false,
        args: true,
        usage: 'steal [UserMention|UserID|UserTag]',
        donatorOnly: false,
        premiumServer: false,
    }
}