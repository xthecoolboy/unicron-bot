
const Discord = require('discord.js');

module.exports = {
    run: async function (client, message, user) {
        const item = client.shopitems.get('apple');
        await user.levelup(client, message, 30);
        await user.removeItem(item);
        return message.channel.send(new Discord.RichEmbed()
            .setColor('RANDOM')
            .setDescription('hmmm THIS TASTY APPLE!'));
    },
    config: {
        id: 'apple',
        displayname: '🍎 Apple',
        description: 'An apple fell from the tree!',
    },
    options: {
        buyable: true,
        sellable: false,
        usable: true,
        price: 15,
        cost: Math.floor(15 * 0.3),
    }
}