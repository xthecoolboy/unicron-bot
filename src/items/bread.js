
const Discord = require('discord.js');

module.exports = {
    run: async function(client, message) {

    },
    config: {
        id: 'bread',
        displayname: '🍞 Bread',
        description: 'Tasty Bread ma man',
    },
    options: {
        buyable: true,
        sellable: true,
        usable: true,
        price: 20,
        cost: Math.floor(20 * 0.3),
    }
}