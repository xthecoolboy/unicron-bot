const Discord = require('discord.js');
const fetch = require('node-fetch');
const { Message } = require('discord.js');
const Client = require('../../classes/Unicron');
const BaseCommand = require('../../classes/BaseCommand');

module.exports = class extends BaseCommand {
    constructor() {
        super({
            config: {
                name: 'urban',
                description: 'Urban Dictionary 101',
                permission: 'User',
            },
            options: {
                aliases: ['dict', 'urban-dict'],
                cooldown: 12,
                args: true,
                nsfwCommand: true,
                usage: 'urban <Word>',
                donatorOnly: false,
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
        const query = `?term=${encodeURIComponent(args.join(' '))}`;
        const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`).then(response => response.json());
        if (!list.length) {
            return message.channel.send(new Discord.MessageEmbed()
                .setColor('RED')
                .setDescription(`No results found for **${args.join(' ')}**.`));
        }
        const [answer] = list;
        return message.channel.send(new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle(answer.word)
            .setURL(answer.permalink)
            .addField('Definition', client.shorten(answer.definition, 1024), false)
            .addField('Example', client.shorten(answer.example, 1024), false)
            .setFooter(`Rating: ${answer.thumbs_up - answer.thumbs_down} Upvotes.`)
        );
    }
}