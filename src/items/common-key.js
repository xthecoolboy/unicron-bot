
const Discord = require('discord.js');

module.exports = {
    run: async function(client, message) {

    },
    config: {
        id: 'common-key',
        displayname: '🔑 Common Key',
        description: 'A key to open the Common crate!',
    },
    options: {
        buyable: true,
        sellable: true,
        usable: true,
        price: 150,
        cost: Math.floor(150 * 0.3),
    }
}