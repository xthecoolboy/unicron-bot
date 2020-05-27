
const Discord = require('discord.js');

module.exports = {
    run: async function(client, message) {

    },
    config: {
        id: 'hammer',
        displayname: '🔨 Hammer',
        description: 'Buy this to work as a construction worker',
    },
    options: {
        buyable: true,
        sellable: true,
        usable: false,
        price: 700,
        cost: Math.floor(700 * 0.3),
    }
}