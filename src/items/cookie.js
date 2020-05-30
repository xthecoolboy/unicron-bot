
const Discord = require('discord.js');

module.exports = {
    run: async function (client, message) {

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
        price: 250,
        cost: Math.floor(250 * 0.3),
    }
}