
const Discord = require('discord.js');

module.exports = {
    run: async function(client, message) {

    },
    config: {
        id: 'diamond',
        displayname: '💠 Diamond',
        description: 'Precious collectable item! _O.o_',
    },
    options: {
        buyable: false,
        sellable: true,
        usable: false,
        price: 1000000,
        cost: Math.floor(1000000 * 0.3),
    }
}