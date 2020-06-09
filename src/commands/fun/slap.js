
const Discord = require('discord.js');

module.exports = {
    /**
     * 
     * @param {Discord.Client} client Client
     * @param {Discord.Message} message Message
     * @param {Array} args Arguments
     */
    run: async function (client, message, args) {
        const user = message.mentions.users.first();
        if (!user) {
            return message.channel.send('Thats an invalid user.');
        }
        const slaps = [
            'https://i.giphy.com/media/3XlEk2RxPS1m8/giphy.gif',
            'https://i.giphy.com/media/mEtSQlxqBtWWA/giphy.gif',
            'https://i.giphy.com/media/j3iGKfXRKlLqw/giphy.gif',
            'https://i.giphy.com/media/2M2RtPm8T2kOQ/giphy.gif',
            'https://i.giphy.com/media/l3YSimA8CV1k41b1u/giphy.gif',
            'https://i.giphy.com/media/WLXO8OZmq0JK8/giphy.gif'
        ];
        message.channel.send(new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setImage(slaps[Math.floor(Math.random() * slaps.length)])
            .setDescription(`${message.author.username} slapped ${user.username}!`)
        );
    },
    config: {
        name: 'slap',
        description: 'Give the user a slap!',
        permission: 'User',
    },
    options: {
        aliases: [],
        clientPermissions: [],
        cooldown: 10,
        nsfwCommand: false,
        args: true,
        usage: 'slap [UserMention]',
        donatorOnly: false,
        premiumServer: false,
    }
}