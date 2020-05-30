
const Discord = require('discord.js');

module.exports = {
    run: async function(client, message) {

    },
    config: {
        id: 'laptop',
        displayname: '💻 Laptop',
        description: 'Use this to work as a developer and earn that salary!',
    },
    options: {
        buyable: true,
        sellable: true,
        usable: false,
        price: 1500,
        cost: Math.floor(1500 * 0.3),
    }
}