
const BaseEvent = require('../classes/BaseEvent');

module.exports = class extends BaseEvent {
    constructor() {
        super('disconnect');
    }
    async run(client, event) {
        setTimeout(() => client.destroy().then(() => client.login(process.env.BOT_TOKEN)), 10000);
        client.logger.error(`[DISCONNECT] Notice: Disconnected from gateway with code ${event.code} - Attempting reconnect.`);
    }
}