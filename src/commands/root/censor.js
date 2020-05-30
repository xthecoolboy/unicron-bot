
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
        name: 'censor',
        description: 'Adds a new word to the censored word list.',
        permission: 'Bot Moderator',
    },
    options: {
        aliases: [],
        clientPermissions: [],
        cooldown: 3,
        nsfwCommand: false,
        args: true,
        usage: 'censor [-add|-remove|-fetch] [word]',
        donatorOnly: false,
        premiumServer: false,
    }
}