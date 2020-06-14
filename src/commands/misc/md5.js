
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