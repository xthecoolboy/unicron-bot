
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
        price: 6250,
        cost: Math.floor(6250 * 0.3),
    }
}