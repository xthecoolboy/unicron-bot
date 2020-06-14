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
        const friendly = client.permission[`${message.author.permLevel}`];
        return message.reply(`Your permission level is: ${message.author.permLevel} - ${friendly}`);
    },
    config: {
        name: 'permissions',
        description: 'Tells you your permission level for the current message guild location.',
        permission: 'User',
    },
    options: {
        cooldown: 3,
        nsfwCommand: false,
        args: false,
        usage: '',
        donatorOnly: false,
    }
}