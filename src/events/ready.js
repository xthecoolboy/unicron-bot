
const Client = require('../classes/Unicron');
const BaseEvent = require('../classes/BaseEvent');

module.exports = class extends BaseEvent {
    constructor() {
        super('ready');
    }
    /**
     * 
     * @param {Client} client 
     */
    async run(client) {
        client.database.users.startInterval();
        client.database.guilds.startInterval();
        if (client.poster && client.poster.options.clientID) client.poster.startInterval(60000 * 30);
    }
}