
const Discord = require('discord.js');

module.exports = {
    run: async function(client, message) {

    },
    config: {
        id: 'dagger',
        displayname: '🗡️ Dagger',
        description: 'Now you can stab your victim and get it\'s MONEY!',
    },
    options: {
        buyable: true,
        sellable: true,
        usable: false,
        price: 1300,
        cost: Math.floor(1300 * 0.3),
    }
}