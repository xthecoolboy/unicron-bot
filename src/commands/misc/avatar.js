
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
        let target;
        if (message.mentions.users.size) {
            target = message.mentions.users.first();
        } else if (args.length) {
            target = await client.users.fetch(args[0]);
        } else {
            target = message.author;
        }
        if (!target) {
            target = message.author;
        }
        return message.channel.send(new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setAuthor(target.tag, target.displayAvatarURL())
            .setImage(`${target.displayAvatarURL()}`)
        );
    },
    config: {
        name: 'avatar',
        description: 'Check user avatar',
        permission: 'User',
    },
    options: {
        aliases: ['av'],
        cooldown: 3,
        args: false,
        usage: `avatar [user]`,
    }
}