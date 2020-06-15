
const Client = require('../classes/Unicron');
const { Message } = require('discord.js');
const BaseItem = require('../classes/BaseItem');

module.exports = class extends BaseItem {
    constructor() {
        super({
            config: {
                id: '',
                displayname: '',
                description: '',
            },
            options: {
                buyable: true,
                sellable: true,
                usable: true,
                price: 50,
                cost: Math.floor(50 * 0.3),
            }
        });
    }
    /**
     * @returns {Promise<Boolean|Message>}
     * @param {Client} client 
     * @param {Message} message 
     */
    async run(client, message) {

    }
}