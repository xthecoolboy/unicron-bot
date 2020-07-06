
const { Message, MessageEmbed } = require('discord.js');
const Client = require('../../classes/Unicron');
const BaseCommand = require('../../classes/BaseCommand');
const fetch = require('node-fetch');

module.exports = class extends BaseCommand {
    constructor() {
        super({
            config: {
                name: 'badquotes',
                description: 'Sends a Random bad quote!',
                permission: 'User',
            },
            options: {
                aliases: ['badquote'],
                clientPermissions: [],
                cooldown: 10,
                nsfwCommand: false,
                args: false,
                usage: '',
                donatorOnly: false,
                premiumServer: false,
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
        try {
            const response = await fetch(`https://breaking-bad-quotes.herokuapp.com/v1/quotes`);
            const body = await response.json();
            return message.channel.send(new MessageEmbed()
                .setColor('RANDOM')
                .setDescription(`${body[0]['quote']}`)
                .setFooter(`- ${body[0]['author']}`)
            );
        } catch (e) {
            throw e;
        }
    }
}