
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
        name: 'hourly',
        description: 'Get paid per hour using this command!',
        permission: 'User',
    },
    options: {
        aliases: [],
        clientPermissions: [],
        cooldown: 60000 * 60,
        nsfwCommand: false,
        args: false,
        usage: '',
        donatorOnly: false,
        premiumServer: false,
    }
}