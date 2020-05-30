
const Discord = require('discord.js');

module.exports = {
    run: async function(client, message) {

    },
    config: {
        id: 'car',
        displayname: '🚗 Car',
        description: 'Your gateway care that increases payout/chances on robbing someone',
    },
    options: {
        buyable: true,
        sellable: true,
        usable: false,
        price: 25000,
        cost: Math.floor(25000 * 0.3),
    }
}