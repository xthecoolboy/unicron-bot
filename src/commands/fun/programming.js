
const { Message, MessageEmbed } = require('discord.js');
const Client = require('../../classes/Unicron');
const BaseCommand = require('../../classes/BaseCommand');
const fetch = require('node-fetch');

module.exports = class extends BaseCommand {
    constructor() {
        super({
            config: {
                name: 'programming',
                description: 'Random programming quote!',
                permission: 'User',
            },
            options: {
                aliases: ['pquote'],
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
            const quote = await fetch('https://programming-quotes-api.herokuapp.com/quotes/random').then((r) => r.json());
            return message.channel.send(new MessageEmbed()
                .setColor('RANDOM')
                .setDescription(`${quote.en}`)
                .setFooter(`- ${quote.author}`)
            );
        } catch (e) {
            throw e;
        }
    }
}