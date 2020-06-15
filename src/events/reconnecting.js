const BaseEvent = require('../classes/BaseEvent');
const Client = require('../classes/Unicron');

module.exports = class extends BaseEvent {
    constructor() {
        super('reconnecting');
    }
    /**
     * 
     * @param {Client} client 
     */
    async run(client) {
        client.logger.info(`[NOTICE] ReconnectAction: Reconnecting to Discord...`);
    }
}
