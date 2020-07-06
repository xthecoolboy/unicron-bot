
const BaseItem = require('../classes/BaseItem');

module.exports = class extends BaseItem {
    constructor() {
        super({
            config: {
                id: 'dagger',
                displayname: '🗡️ Dagger',
                description: 'Now you can stab your victim and get it\'s MONEY!',
            },
            options: {
                buyable: true,
                sellable: true,
                usable: false,
                price: 1300,
                cost: Math.floor(1300 * 0.3),
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