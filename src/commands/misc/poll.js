
const Discord = require('discord.js');
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
        try {
            await message.react(await client.getEmoji('yes'));
            await message.react(await client.getEmoji('no'));
            await message.react(await client.getEmoji('PepoHmm'));
            await message.react(await client.getEmoji('PepoShrug'));
        } catch (e) {
            client.logger.warn(`Reactions did not react on ${message.guild.name} / ${message.guild.id} / ${message.id}`)
        }
    },
    config: {
        name: 'poll',
        description: 'Make polls using this command!',
        permission: 'User',
    },
    options: {
        aliases: [],
        clientPermissions: ['ADD_REACTIONS'],
        cooldown: 3,
        nsfwCommand: false,
        args: true,
        usage: 'poll [Poll]',
        donatorOnly: false,
        premiumServer: false,
    }
}