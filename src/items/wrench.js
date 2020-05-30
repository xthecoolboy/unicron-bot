
const Discord = require('discord.js');

module.exports = {
    run: async function(client, message) {

    },
    config: {
        id: 'wrench',
        displayname: '🔧 Wrench',
        description: 'The only item can break a padlock. _Beware it might broke_!',
    },
    options: {
        buyable: true,
        sellable: true,
        usable: false,
        price: 5900,
        cost: Math.floor(5900 * 0.3),
    }
}