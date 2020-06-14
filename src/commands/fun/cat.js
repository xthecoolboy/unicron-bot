
const Discord = require('discord.js');
const fetch = require('node-fetch')
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
            const response = await fetch('https://aws.random.cat/meow');
            const { file } = await response.json();
            message.channel.send(new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setImage(file)
                .setDescription('https://random.cat/')
            );
        } catch (e) {
            throw e;
        }
    },
    config: {
        name: 'cat',
        description: 'Random Cat <3',
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