
const Discord = require('discord.js');

module.exports = {
    run: async function(client, message) {

    },
    config: {
        id: 'ultra-key',
        displayname: '🌟 Ultra Key',
        description: 'The most awesome item that can open the magnificent ULTRA CRATE!',
    },
    options: {
        buyable: true,
        sellable: true,
        usable: true,
        price: 1500,
        cost: Math.floor(1500 * 0.3),
    }
}