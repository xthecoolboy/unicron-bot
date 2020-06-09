
const Discord = require('discord.js');

module.exports = {
    /**
     * 
     * @param {Discord.Client} client Client
     * @param {Discord.Message} message Message
     * @param {Array} args Arguments
     */
    run: async function (client, message, args) {
        console.log(client.crates);
    },
    config: {
        name: 'crate',
        description: 'Shows all crates!',
        permission: 'User',
    },
    options: {
        aliases: ['crates'],
        clientPermissions: [],
        cooldown: 3,
        nsfwCommand: false,
        args: false,
        usage: '',
        donatorOnly: false,
        premiumServer: false,
    }
}