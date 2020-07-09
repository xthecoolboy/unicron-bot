
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
        await client.wait(5000);
        client.shard.broadcastEval(`
            if (this.shard.id === 0) {
                const client = ${client};
                client.poster.startInterval();
            }
        `);
    }
}