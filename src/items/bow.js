
const Discord = require('discord.js');

module.exports = {
    run: async function(client, message) {

    },
    config: {
        id: 'bow',
        displayname: '🏹 Bow',
        description: 'A weapon prevent anyone from robbing you.',
    },
    options: {
        buyable: true,
        sellable: true,
        usable: false,
        price: 3900,
        cost: Math.floor(3900 * 0.3),
    }
}