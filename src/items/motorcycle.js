
const BaseItem = require('../classes/BaseItem');

module.exports = class extends BaseItem {
    constructor() {
        super({
            config: {
                id: 'motorcycle',
                displayname: '🏍 Motorcycle',
                description: 'It\'s time to ride like a GANG GANG GANG!',
            },
            options: {
                buyable: true,
                sellable: true,
                usable: false,
                price: 16500,
                cost: Math.floor(6500 * 0.3),
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