
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
        name: 'use',
        description: 'Use an item from your inventory!',
        permission: 'User',
    },
    options: {
        aliases: [],
        clientPermissions: [],
        cooldown: 45000,
        nsfwCommand: false,
        args: true,
        usage: 'use [Item]',
        donatorOnly: false,
        premiumServer: false,
    }
}