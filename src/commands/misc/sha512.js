
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
        name: 'sha512',
        description: 'SHA512 Encryption',
        permission: 'User',
    },
    options: {
        aliases: [],
        clientPermissions: [],
        cooldown: 10,
        nsfwCommand: false,
        args: true,
        usage: 'sha512 [...Text]',
        donatorOnly: false,
        premiumServer: false,
    }
}