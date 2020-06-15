const Client = require('../classes/Unicron');

/**
 * @param {Client} client
 */
module.exports = async (client) => {
    client.logger.info('Loading modules...');
    await require('../listeners')(client);
    await require('./Permissions')(client);
    client.logger.info('Modules loaded.');
}