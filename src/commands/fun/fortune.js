
const Discord = require('discord.js');
const fortune = require('../../../assets/fortuneCookies.json');

module.exports = {
    run: async function (client, message) {
        await message.channel.send(new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle('Your fortune says...')
            .setDescription(fortune.random()))
        ;
    },
    config: {
        name: 'fortune',
        description: 'Shows you a fortune from a fortune cookie.',
        permission: 'User',
    },
    options: {
        aliases: ['cookie'],
        cooldown: 15,
    }
}