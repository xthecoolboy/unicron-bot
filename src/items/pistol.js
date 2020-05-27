
const Discord = require('discord.js');

module.exports = {
    run: async function(client, message) {

    },
    config: {
        id: 'pistol',
        displayname: '🔫 Pistol',
        description: 'Increase your chance robbing someone!',
    },
    options: {
        buyable: true,
        sellable: true,
        usable: false,
        price: 2700,
        cost: Math.floor(2700 * 0.3),
    }
}