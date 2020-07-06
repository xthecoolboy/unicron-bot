const BaseItem = require('../classes/BaseItem');

module.exports = class extends BaseItem {
    constructor() {
        super({
            config: {
                id: 'diamond',
                displayname: '💠 Diamond',
                description: 'Precious collectable item! _O.o_',
            },
            options: {
                buyable: true,
                sellable: true,
                usable: false,
                price: 1000000,
                cost: Math.floor(1000000 * 0.3),
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