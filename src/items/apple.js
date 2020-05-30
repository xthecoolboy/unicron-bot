
const Discord = require('discord.js');

module.exports = {
    run: async function (client, message) {
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