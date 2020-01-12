
const { promisify } = require('util');
const readdir = promisify(require('fs').readdir);

module.exports = async (client) => {
    const events = await readdir('./src/events/');
    events.forEach(file => {
        const eventName = file.split('.')[0];
        const event = require(`../events/${file}`);
        client.logger.log(`Event ${file} loaded`);
        client.on(eventName, event.bind(null, client));
    });
}