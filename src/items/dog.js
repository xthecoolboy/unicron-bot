
const Discord = require('discord.js');

module.exports = {
    run: async function(client, message) {

    },
    config: {
        id: 'dog',
        displayname: '🐶 Dog',
        description: 'Your best pal that protects you from getting rob!',
    },
    options: {
        buyable: true,
        sellable: true,
        usable: false,
        price: 9000,
        cost: Math.floor(9000 * 0.3),
    }
}