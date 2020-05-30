
const Discord = require('discord.js');

module.exports = {
    run: async function(client, message) {

    },
    config: {
        id: 'rare-key',
        displayname: '💗 Rare Key',
        description: 'The glorious item that can open the RARE CRATE!',
    },
    options: {
        buyable: false,
        sellable: true,
        usable: true,
        price: 600,
        cost: Math.floor(600 * 0.3),
    }
}