
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
        const fn = client.poster.startInterval;
        client.shard.broadcastEval(`if (this.shard.id === 0) (${fn.bind(client)})();`);
    }
}