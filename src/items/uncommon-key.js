
const Discord = require('discord.js');

module.exports = {
    run: async function(client, message) {

    },
    config: {
        id: 'uncommon-key',
        displayname: '🗝️ Uncommon Key',
        description: 'The only that can open the UNCOMMON CRATE!',
    },
    options: {
        buyable: true,
        sellable: true,
        usable: true,
        price: 450,
        cost: Math.floor(450 * 0.3),
    }
}