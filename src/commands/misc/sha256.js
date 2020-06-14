
const Discord = require('discord.js');
const Crypto = require('crypto');
const { Message } = require('discord.js');
const Client = require('../../classes/Unicron');

module.exports = {
    /**
     * 
     * @param {Client} client Client
     * @param {Message} message Message
     * @param {Array<String>} args Arguments
     */
    run: async function (client, message, args) {
        return message.channel.send(Crypto.createHmac('sha256', args.join(' ')).digest('hex'));
    },
    config: {
        name: 'sha256',
        description: 'SHA256 Encryption',
        permission: 'User',
    },
    options: {
        aliases: [],
        clientPermissions: [],
        cooldown: 10,
        nsfwCommand: false,
        args: true,
        usage: 'sha256 [...Text]',
        donatorOnly: false,
        premiumServer: false,
    }
}