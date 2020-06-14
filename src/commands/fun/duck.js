
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
        const response = await fetch('https://random-d.uk/api/v1/random');
        const { url: attachment } = await response.json();
        message.channel.send(new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setDescription('https://random-d.uk/')
            .setImage(attachment)
        );
    },
    config: {
        name: 'duck',
        description: 'Random pictures of a duck!',
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