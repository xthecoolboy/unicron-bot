
const Discord = require('discord.js');

module.exports = {
    run: async function(client, message) {

    },
    config: {
        id: 'laptop',
        displayname: '💻 Laptop',
        description: 'Use this to postmemes and earn that MONEY!',
    },
    options: {
        buyable: true,
        sellable: true,
        usable: false,
        price: 1200,
        cost: Math.floor(1200 * 0.3),
    }
}