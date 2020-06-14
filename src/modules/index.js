const Client = require('../classes/Unicron');

/**
 * @param {Client} client
 */
module.exports = async (client) => {
    client.logger.info('Loading modules...');
    await require('../listeners')(client);
    await require('./Permissions')(client);
    await require('./Emote')(client);
    await require('./ShopItems')(client);
    await require('./Commands')(client);
    await require('./Events')(client);
    client.logger.info('Modules loaded.');
}