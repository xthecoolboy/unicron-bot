
const Discord = require('discord.js');
const fetch = require('node-fetch')
const { Message } = require('discord.js');
const Client = require('../../classes/Unicron');
const BaseCommand = require('../../classes/BaseCommand');

module.exports = class extends BaseCommand {
    constructor() {
        super({
            config: {
                name: 'cat',
                description: 'Random Cat <3',
                permission: 'User',
            },
            options: {
                aliases: [],
                clientPermissions: ['EMBED_LINKS'],
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
            const response = await fetch('http://placekitten.com/200/300');
            const body = await response.json();
            message.channel.send(new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setImage(body)
                .setDescription('https://random.cat/')
            );
        } catch (e) {
            throw e;
        }
    }
}