
const Discord = require('discord.js');

module.exports = {
    run: async function(client, message) {

    },
    config: {
        id: '',
        displayname: '',
        description: '',
    },
    options: {
        buyable: true,
        sellable: true,
        usable: true,
        price: 50,
        cost: Math.floor(50 * 0.3),
    }
}