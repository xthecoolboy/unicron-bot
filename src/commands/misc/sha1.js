
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
        name: 'sha1',
        description: 'SHA1 Encryption',
        permission: 'User',
    },
    options: {
        aliases: [],
        clientPermissions: [],
        cooldown: 3,
        nsfwCommand: false,
        args: true,
        usage: 'sha1 [...Text]',
        donatorOnly: false,
        premiumServer: false,
    }
}