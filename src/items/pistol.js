
const BaseItem = require('../classes/BaseItem');

module.exports = class extends BaseItem {
    constructor() {
        super({
            config: {
                id: 'pistol',
                displayname: '🔫 Pistol',
                description: 'Increase your chance robbing someone!',
            },
            options: {
                buyable: true,
                sellable: true,
                usable: false,
                price: 2700,
                cost: Math.floor(2700 * 0.3),
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