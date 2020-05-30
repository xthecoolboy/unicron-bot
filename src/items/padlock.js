
const Discord = require('discord.js');

module.exports = {
    run: async function(client, message) {

    },
    config: {
        id: 'padlock',
        displayname: '🔒 Padlock',
        description: 'Increase the protection of your coins by buying this awesome padlock!',
    },
    options: {
        buyable: true,
        sellable: true,
        usable: true,
        price: 3400,
        cost: Math.floor(3400 * 0.3),
    }
}