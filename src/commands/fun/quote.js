
const Discord = require('discord.js');
const { Random } = require('../../utils/');
const quotes = require('../../../assets/quotes.json');
const { Message } = require('discord.js');
const Client = require('../../classes/Unicron');
const BaseCommand = require('../../classes/BaseCommand');

module.exports = class extends BaseCommand {
    constructor() {
        super({
            config: {
                name: 'quote',
                category: 'fun',
                description: 'Shows a random quote to get you inspired.',
                permission: 'User',
            },
            options: {
                aliases: ['quotes'],
                cooldown: 10,
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
        const index = Random.nextInt({ max: 241, min: 0 });
        return message.channel.send(new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setDescription(`${quotes[index]['quote']}`)
            .setFooter(`- ${quotes[index]['author']}`)
        );
    }
}