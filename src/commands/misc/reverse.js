
const Discord = require('discord.js');

module.exports = {
    /**
     * 
     * @param {Discord.Client} client Client
     * @param {Discord.Message} message Message
     * @param {[String]} args Arguments
     */
    run: async function (client, message, args) {
        const content = args
            .join(' ')
            .split('')
            .reverse()
            .join('')
            .replace(/`/g, '`' + String.fromCharCode(8203))
            .replace(/@/g, '@' + String.fromCharCode(8203))
        message.channel.send(content);
    },
    config: {
        name: 'reverse',
        description: 'Reverse the given text.',
        permission: 'User',
    },
    options: {
        aliases: [],
        clientPermissions: [],
        cooldown: 3,
        nsfwCommand: false,
        args: true,
        usage: 'reverse [...Text]',
        donatorOnly: false,
        premiumServer: false,
    }
}