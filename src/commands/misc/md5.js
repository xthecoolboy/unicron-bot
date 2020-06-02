
const Discord = require('discord.js');

const Crypto = require('crypto');

module.exports = {
    /**
     * 
     * @param {Discord.Client} client Client
     * @param {Discord.Message} message Message
     * @param {Array} args Arguments
     */
    run: async function (client, message, args) {
        return message.channel.send(Crypto.createHmac('md5', args.join(' ')).digest('hex'));
    },
    config: {
        name: 'md5',
        description: 'MD5 Hash Encryption.',
        permission: 'User',
    },
    options: {
        aliases: [],
        clientPermissions: [],
        cooldown: 10,
        nsfwCommand: false,
        args: true,
        usage: 'md5 [...Text]',
        donatorOnly: false,
        premiumServer: false,
    }
}