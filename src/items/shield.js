
const Discord = require('discord.js');

module.exports = {
    run: async function(client, message) {

    },
    config: {
        id: 'shield',
        displayname: '🛡️ Shield',
        description: 'Protect yourself from those greedy robbers!',
    },
    options: {
        buyable: true,
        sellable: true,
        usable: false,
        price: 5600,
        cost: Math.floor(5600 * 0.3),
    }
}