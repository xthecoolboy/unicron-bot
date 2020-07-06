const BaseItem = require('../classes/BaseItem');

module.exports = class extends BaseItem {
    constructor() {
        super({
            config: {
                id: 'dog',
                displayname: '🐶 Dog',
                description: 'Your best pal that protects you from getting rob!',
            },
            options: {
                buyable: true,
                sellable: true,
                usable: false,
                price: 9000,
                cost: Math.floor(9000 * 0.3),
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