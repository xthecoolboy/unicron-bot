
const BaseItem = require('../classes/BaseItem');

module.exports = class extends BaseItem {
    constructor() {
        super({
            config: {
                id: 'shield',
                displayname: '🛡️ Shield',
                description: 'Use this to protect yourself from robbers!',
            },
            options: {
                buyable: true,
                sellable: true,
                usable: false,
                price: 5600,
                cost: Math.floor(5600 * 0.3),
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