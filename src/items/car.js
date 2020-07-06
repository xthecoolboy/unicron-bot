
const BaseItem = require('../classes/BaseItem');

module.exports = class extends BaseItem {
    constructor() {
        super({
            config: {
                id: 'car',
                displayname: '🚗 Car',
                description: 'Your gateaway car that increases payout/chances on robbing someone',
            },
            options: {
                buyable: true,
                sellable: true,
                usable: false,
                price: 75000,
                cost: Math.floor(25000 * 0.3),
            }
        })
    }
    /**
     * @returns {Promise<boolean|Message>}
     * @param {Client} client 
     * @param {Message} message 
     */
    async run(client, message) {

    }
}