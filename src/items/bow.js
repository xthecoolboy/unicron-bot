
const Discord = require('discord.js');
const BaseItem = require('../classes/BaseItem');

module.exports = class extends BaseItem {
    constructor() {
        super({
            config: {
                id: 'bow',
                displayname: '🏹 Bow',
                description: 'A weapon to prevent anyone from robbing you.',
            },
            options: {
                buyable: true,
                sellable: true,
                usable: false,
                price: 3900,
                cost: Math.floor(3900 * 0.3),
            }
        });
    }
    /**
     * @returns {Promise<boolean|Message>}
     * @param {Client} client 
     * @param {Message} message 
     */
    async run(client, message) {

    }
}