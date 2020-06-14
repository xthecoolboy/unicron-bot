
const Client = require('../classes/Unicron');

/**
 * @param {Client} client
 */
module.exports = (client) => {
    client.user.setPresence({
        activity: { 
            name: `${client.guilds.cache.size} guilds!`, 
            type: 'LISTENING',
        }, 
        status: 'online',
    });
    if (client.poster) client.poster.startInterval();
    client.logger.info(`Bot Ready! ${client.user.tag} / ${client.user.id}`);
}