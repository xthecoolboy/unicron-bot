
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
        await client.database.users.sync();
        await client.database.guilds.sync();
        client.user.setPresence({
            activity: {
                name: `${client.guilds.cache.size} guilds!`,
                type: 'LISTENING',
            },
            status: 'online',
        });
        if (client.poster && client.poster.options.clientID) client.poster.startInterval(60000 * 30);
        client.logger.info(`API Server running on port : ${client.port}`);
        client.logger.info(`Bot Ready! ${client.user.tag} / ${client.user.id}`);
    }
}