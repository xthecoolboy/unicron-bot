
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
        name: 'gamble',
        description: 'Gamble some coins to win/lose coins!',
        permission: 'User',
    },
    options: {
        aliases: ['bet'],
        clientPermissions: [],
        cooldown: 3,
        nsfwCommand: false,
        args: true,
        usage: 'gamble [amount]',
        donatorOnly: false,
        premiumServer: false,
    }
}