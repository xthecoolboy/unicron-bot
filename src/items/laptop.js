const BaseItem = require('../classes/BaseItem');

module.exports = class extends BaseItem {
    constructor() {
        super({
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