
const Discord = require('discord.js');
const https = require('https');
const { Message } = require('discord.js');
const Client = require('../../classes/Unicron');
const BaseCommand = require('../../classes/BaseCommand');

const url = [
    'https://www.reddit.com/r/dankmemes/hot/.json?limit=100',
    'https://www.reddit.com/r/memes/hot/.json?limit=100',
];

module.exports = class extends BaseCommand {
    constructor() {
        super({
            config: {
                name: 'meme',
                description: 'Meme Generator 101',
                permission: 'User',
            },
            options: {
                aliases: ['dankmeme'],
                cooldown: 6,
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
        https.get(url[Math.floor(Math.random() * url.length)], (result) => {
            let body = '';
            result.on('data', (chunk) => {
                body += chunk;
            });
            result.on('end', () => {
                let response = JSON.parse(body);
                let index = response.data.children[Math.floor(Math.random() * 99) + 1].data;
                if (index.post_hint !== 'image') {
                    return message.channel.send(new Discord.MessageEmbed()
                        .setAuthor('r/dankmemes')
                        .setColor('RANDOM')
                        .setDescription(`[${title}](${client.unicron.serverInviteURL})`));
                }
                let image = index.url;
                let title = index.title;
                return message.channel.send(new Discord.MessageEmbed()
                    .setAuthor('r/dankmemes')
                    .setImage(image)
                    .setColor('RANDOM')
                    .setDescription(`[${title}](${client.unicron.serverInviteURL})`));
            }).on('error', error => {
                client.logger.error(error);
                return false;
            });
        });
    }
}