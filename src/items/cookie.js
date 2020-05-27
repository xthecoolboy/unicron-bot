
const Discord = require('discord.js');

module.exports = {
    run: async function (client, message, user) {
        const item = client.shopitems.get('cookie');
        await user.levelup(client, message, 100);
        await user.removeItem(item);
        return message.channel.send(new Discord.RichEmbed()
            .setColor('RANDOM')
            .setDescription('Yum yum im the cookie monster!'));
    },
    config: {
        id: 'cookie',
        displayname: '🍪 Cookie',
        description: 'Special made cookie just for you!',
    },
    options: {
        buyable: true,
        sellable: false,
        usable: true,
        price: 550,
        cost: Math.floor(550 * 0.3),
    }
}