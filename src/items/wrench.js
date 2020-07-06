
const BaseItem = require('../classes/BaseItem');

module.exports = class extends BaseItem {
    constructor() {
        super({
            config: {
                id: 'wrench',
                displayname: '🔧 Wrench',
                description: 'Use this so you can work as a Mechanic!',
            },
            options: {
                buyable: true,
                sellable: true,
                usable: false,
                price: 1100,
                cost: Math.floor(1100 * 0.3),
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