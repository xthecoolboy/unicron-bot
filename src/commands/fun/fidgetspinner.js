const Discord = require('discord.js');
const { Message } = require('discord.js');
const Client = require('../../classes/Unicron');
const BaseCommand = require('../../classes/BaseCommand');

module.exports = class extends BaseCommand {
    constructor() {
        super({
            config: {
                name: 'fidgetspinner',
                description: 'Spins a fidget spinner for you and shows for how long it was spinning.',
                permission: 'User',
            },
            options: {
                aliases: ['fidget'],
                cooldown: 8,
                nsfwCommand: false,
                args: false,
                donatorOnly: false,
            }
        });
        this.gateway = [
            'https://i.imgur.com/KJJxVi4.gif',
            'https://media.giphy.com/media/1Ubrzxvik2puE/giphy.gif',
            'https://media.giphy.com/media/l1KVaE9P0XcwJMwrC/giphy.gif'
        ]
    }
    /**
     * @returns {Promise<Message|boolean>}
     * @param {Client} client 
     * @param {Message} message 
     * @param {Array<string>} args 
     */
    async run(client, message, args) {
        let spinning = await message.channel.send(new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setDescription(`${message.author.tag} is spinning a fidget spinner...`)
            .setImage(this.gateway[Math.floor(Math.random() * this.gateway.length)])
        );

        let timeout = (Math.random() * (60 - 5 + 1)) + 5;
        setTimeout(() => {
            spinning.edit(new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setDescription(`${message.author.tag}, you spun the fidget spinner for ${timeout.toFixed(2)} seconds.`)
            ).catch(e => {
                client.logger.error(e);
            });
        }, timeout * 1000);
    }
}