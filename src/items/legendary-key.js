
const Discord = require('discord.js');

module.exports = {
    run: async function(client, message) {

    },
    config: {
        id: 'legendary-key',
        displayname: '✨ Legendary Key',
        description: 'The legendary key has the ability to open the awesome legendary create!',
    },
    options: {
        buyable: false,
        sellable: true,
        usable: true,
        price: 1000,
        cost: Math.floor(1000 * 0.3),
    }
}