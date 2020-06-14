const { promisify } = require('util');
const readdir = promisify(require('fs').readdir);
const Client = require('../classes/Unicron');

/**
 * @param {Client} client
 */
module.exports = async (client) => {
    client.logger.info('Loading events...');
        const events = await readdir('./src/events/');
        events.forEach(file => {
            const eventName = file.split('.')[0];
            const event = require(`../events/${file}`);
            client.on(eventName, event.bind(null, client));
        });
    client.logger.info(`Events loaded.`)
}