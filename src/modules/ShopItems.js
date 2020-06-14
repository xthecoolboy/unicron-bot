const { promisify } = require('util');
const readdir = promisify(require('fs').readdir);
const Client = require('../classes/Unicron');

/**
 * @param {Client} client
 */
module.exports = async (client) => {
    client.logger.info('Loading Shop Items...');
    const itemFiles = await readdir('./src/items/');
    itemFiles.forEach(f => {
        if (!f.endsWith('.js')) return;
        const response = client.loadItem(f);
        if (response) client.logger.error(response);
    });
    client.logger.info('Shop items loaded.');
}