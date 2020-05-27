
const Discord = require('discord.js');

module.exports = {
    run: async function(client, message) {

    },
    config: {
        id: 'motorcycle',
        displayname: '🏍 Motorcycle',
        description: 'It\'s time to ride like a GANG GANG GANG!',
    },
    options: {
        buyable: true,
        sellable: true,
        usable: false,
        price: 16500,
        cost: Math.floor(6500 * 0.3),
    }
}