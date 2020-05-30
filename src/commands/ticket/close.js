
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
        name: 'close',
        description: 'Close a ticket!',
        permission: 'User',
    },
    options: {
        aliases: [],
        clientPermissions: ['MANAGE_CHANNELS'],
        cooldown: 10,
        nsfwCommand: false,
        args: false,
        usage: 'close [...Reason]',
        donatorOnly: false,
        premiumServer: false,
    }
}