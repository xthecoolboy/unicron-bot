
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
        client.logger.info(`${client.user.tag}/${client.user.id} ${client.shard} ready!`)
    }
}