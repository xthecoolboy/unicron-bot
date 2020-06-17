
const Discord = require('discord.js');
const { Message } = require('discord.js');
const Client = require('../../classes/Unicron');
const BaseCommand = require('../../classes/BaseCommand');

module.exports = class extends BaseCommand {
    constructor() {
        super({
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
        });
    }
    /**
     * @returns {Promise<Message|Boolean>}
     * @param {Client} client 
     * @param {Message} message 
     * @param {Array<String>} args 
     */
    async run(client, message, args) {
        let target = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
        if (!target) target = message.author;
        return message.channel.send(new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setAuthor(target.tag, target.displayAvatarURL())
            .setImage(target.displayAvatarURL())
        );
    }
}