
const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    /**
     * 
     * @param {Discord.Client} client Client
     * @param {Discord.Message} message Message
     * @param {Array} args Arguments
     */
    run: async function (client, message, args) {
        try {
            const response = await fetch('https://dog.ceo/api/breeds/image/random');
            const attachment = await response.json();
            message.channel.send(new Discord.MessageEmbed()
                .setImage(attachment.message)
                .setTitle('Doggo')
                .setFooter(message.author.tag, message.author.displayAvatarURL() || null)
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