
const BaseEvent = require('../classes/BaseEvent');

module.exports = class extends BaseEvent {
    constructor() {
        super('error');
    }
    async run(client, error) {
        client.logger.error(`An error event was sent by Discord.js: \n${error.name}`);
    }
}