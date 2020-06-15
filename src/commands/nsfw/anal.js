
const Discord = require('discord.js');
const https = require('https');
const { Message } = require('discord.js');
const Client = require('../../classes/Unicron');
const BaseCommand = require('../../classes/BaseCommand');

const url = [
    'https://www.reddit.com/r/anal/hot/.json?limit=100',
];

module.exports = class extends BaseCommand {
    constructor() {
        super({
            config: {
                name: 'anal',
                description: 'anal',
                permission: 'User',
            },
            options: {
                nsfwCommand: true,
                cooldown: 15,
                args: false,
                usage: '',
                donatorOnly: false,
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
        https.get(url.random(), (result) => {
            let body = '';
            result.on('data', (chunk) => {
                body += chunk;
            });
            result.on('end', () => {
                let response = JSON.parse(body);
                let index = response.data.children[Math.floor(Math.random() * 99) + 1].data;
                let image = index.url;
                let title = index.title;
                return message.channel.send(new Discord.MessageEmbed()
                    .setImage(image)
                    .setColor('RANDOM')
                    .setDescription(`[${title}](https://www.reddit.com/r/anal)`));
            }).on('error', error => {
                client.logger.error(error);
                return false;
            });
        });
    }
}