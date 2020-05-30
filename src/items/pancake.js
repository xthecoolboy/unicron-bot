
const Discord = require('discord.js');

module.exports = {
    run: async function (client, message, user) {
        
    },
    config: {
        id: 'pancake',
        displayname: '🥞 Pancakes',
        description: 'It\'s a cake made from a frying pan!',
    },
    options: {
        buyable: true,
        sellable: false,
        usable: true,
        price: 350,
        cost: Math.floor(350 * 0.3),
    }
}