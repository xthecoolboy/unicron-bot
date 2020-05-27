
const Discord = require('discord.js');

module.exports = {
    run: async function(client, message) {

    },
    config: {
        id: 'wrench',
        displayname: '🔧 Wrench',
        description: 'You can fix almost anything from the shop!',
    },
    options: {
        buyable: true,
        sellable: true,
        usable: true,
        price: 8900,
        cost: Math.floor(8900 * 0.3),
    }
}