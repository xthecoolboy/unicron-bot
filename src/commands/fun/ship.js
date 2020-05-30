
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
        name: 'ship',
        description: 'Shippeng two pepols',
        permission: 'User',
    },
    options: {
        aliases: ['match'],
        clientPermissions: [],
        cooldown: 10,
        nsfwCommand: false,
        args: false,
        usage: 'ship [UserMention] [UserMention](_Optional_)',
        donatorOnly: false,
        premiumServer: false,
    }
}