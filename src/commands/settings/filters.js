
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
        name: 'filters',
        description: 'Server Filters',
        permission: 'Server Administrator',
    },
    options: {
        aliases: ['filter'],
        clientPermissions: [],
        cooldown: 10,
        nsfwCommand: false,
        args: false,
        usage: '',
        donatorOnly: false,
        premiumServer: false,
    }
}