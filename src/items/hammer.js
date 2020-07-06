const BaseItem = require('../classes/BaseItem');

module.exports = class extends BaseItem {
    constructor() {
        super({
            config: {
                id: 'hammer',
                displayname: '🔨 Hammer',
                description: 'Buy this to work as a construction worker',
            },
            options: {
                buyable: true,
                sellable: true,
                usable: false,
                price: 700,
                cost: Math.floor(700 * 0.3),
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