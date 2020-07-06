const BaseItem = require('../classes/BaseItem');

module.exports = class extends BaseItem {
    constructor() {
        super({
            config: {
                id: 'heart',
                displayname: '❤️ Heart',
                description: 'Awesome collectable item! _Don\'t ever break it >.>_',
            },
            options: {
                buyable: true,
                sellable: true,
                usable: false,
                price: 500000,
                cost: Math.floor(500000 * 0.3),
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