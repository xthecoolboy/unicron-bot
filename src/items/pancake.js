
const Discord = require('discord.js');

module.exports = {
    run: async function (client, message, user) {
        const item = client.shopitems.get('pancake');
        await user.levelup(message, 50);
        await user.removeItem(item);
        return message.channel.send(new Discord.RichEmbed()
            .setColor('RANDOM')
            .setDescription('YUmYY! this pancake da best!'));
    },
    config: {
        id: 'pancake',
        displayname: '🥞 Pancakes',
        description: 'It\'s a cake made from a frying pan!',
    },
    options: {
        buyable: true,
        sellable: false,
        usable: true,
        price: 350,
        cost: Math.floor(350 * 0.3),
    }
}