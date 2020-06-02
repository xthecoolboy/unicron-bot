
const Discord = require('discord.js');

module.exports = {
    /**
     * 
     * @param {Discord.Client} client Client
     * @param {Discord.Message} message Message
     * @param {Array} args Arguments
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