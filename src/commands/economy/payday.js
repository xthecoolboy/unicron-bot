
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
        name: 'payday',
        description: 'ITS PAYDAY',
        permission: 'User',
    },
    options: {
        aliases: [],
        clientPermissions: [],
        cooldown: 60000 * 60 * 24,
        nsfwCommand: false,
        args: false,
        usage: '',
        donatorOnly: false,
        premiumServer: false,
    }
}