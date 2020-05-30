
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
        name: 'automod',
        description: 'Toggles AutoModeration of the server!',
        permission: 'Server Administrator',
    },
    options: {
        aliases: [],
        clientPermissions: [],
        cooldown: 10,
        nsfwCommand: false,
        args: false,
        usage: '',
        donatorOnly: false,
        premiumServer: false,
    }
}