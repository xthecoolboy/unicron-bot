
const Discord = require('discord.js');
const fetch = require('node-fetch');
const { Message }= require('discord.js');
const Client = require('../../classes/Unicron');

module.exports = {
    /**
     * 
     * @param {Client} client Client
     * @param {Message} message Message
     * @param {Array<String>} args Arguments
     */
    run: async function (client, message, args) {
        try {
            const response = await fetch('https://dog.ceo/api/breeds/image/random');
            const { message: attachment } = await response.json();
            message.channel.send(new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setDescription('https://dog.ceo/')
                .setImage(attachment)
            );
        } catch (e) {
            throw e;
        }
    },
    config: {
        name: 'dog',
        description: 'Random Dogs',
        permission: 'User',
    },
    options: {
        aliases: [],
        clientPermissions: [],
        cooldown: 10,
        nsfwCommand: false,
        args: false,
        usage: '',
        donatorOnly: false,
        premiumServer: false,
    }
}