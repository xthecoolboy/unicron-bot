
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
        name: 'ticketconfig',
        description: 'Ticket System Configuration!',
        permission: 'Server Administrator',
    },
    options: {
        aliases: ['ticketconf'],
        clientPermissions: [],
        cooldown: 10,
        nsfwCommand: false,
        args: true,
        usage: 'ticketconfig [view|set|reset] [key] [value]',
        donatorOnly: false,
        premiumServer: false,
    }
}