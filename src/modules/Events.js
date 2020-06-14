const { promisify } = require('util');
const readdir = promisify(require('fs').readdir);

module.exports = async (client) => {
    await client.logger.info('Loading events...');
    await (async function () {
        const events = await readdir('./src/events/');
        events.forEach(file => {
            const eventName = file.split('.')[0];
            const event = require(`../events/${file}`);
            client.on(eventName, event.bind(null, client));
        });
    })();
    await client.logger.info(`Events loaded.`)
}