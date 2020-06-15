
const Discord = require('discord.js');
const User = require('../../handlers/User');
const { Message } = require('discord.js');
const Client = require('../../classes/Unicron');
const BaseCommand = require('../../classes/BaseCommand');

module.exports = class extends BaseCommand {
    constructor() {
        super({
            config: {
                name: 'marriage',
                description: 'Shows marriage certificate of a user',
                permission: 'User',
            },
            options: {
                aliases: ['waifu'],
                cooldown: 3,
                nsfwCommand: false,
                args: false,
                usage: 'marriage [UserMention|UserID]',
                donatorOnly: false,
                premiumServer: false,
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
        const target = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
        const t = new User(target.id);
        if (! await t.profile('married_id')) {
            return message.channel.send(new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setTimestamp()
                .setAuthor(target.tag, target.displayAvatarURL() || client.user.displayAvatarURL())
                .setDescription('Not married to someone else, kek')
            );
        }
        return message.channel.send(new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTimestamp()
            .setAuthor(target.tag, target.displayAvatarURL() || client.user.displayAvatarURL())
            .setTitle('Marriage Certificate')
            .setDescription(`${target} ❤️ <@${await t.profile('married_id')}>`)
        );
    }
}