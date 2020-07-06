
const Discord = require('discord.js');
const { Random } = require('../../utils/');
const { Message } = require('discord.js');
const Client = require('../../classes/Unicron');
const BaseCommand = require('../../classes/BaseCommand');

module.exports = class extends BaseCommand {
    constructor() {
        super({
            config: {
                name: 'penis',
                description: 'User Penis length identifier 1000',
                permission: 'User',
            },
            options: {
                cooldown: 12,
                args: false,
                usage: 'penis [UserMention|UserID]',
            }
        });
    }
    /**
     * @returns {Promise<Message|boolean>}
     * @param {Client} client 
     * @param {Message} message 
     * @param {Array<string>} args 
     */
    async run(client, message, args) {
        let target = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
        if (!target) target = message.author;
        let embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`${target.tag}\'s penis`);
        let max = Random.nextInt({ max: 30, min: 0 });
        let gland = '';
        for (let i = 0; i < max; i++) {
            gland += '=';
        }
        embed.setDescription(`8${gland}D`);
        return message.channel.send(embed);
    }
}