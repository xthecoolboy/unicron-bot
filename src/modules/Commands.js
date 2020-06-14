const { promisify } = require('util');
const readdir = promisify(require('fs').readdir);
const Client = require('../classes/Unicron');

/**
 * @param {Client} client
 */
module.exports = async (client) => {
    client.logger.info('Loading commands...');
    const cmds = await readdir('./src/commands/');
    cmds.forEach(async (fo) => {
        const files = await readdir(`./src/commands/${fo}/`);
        files.forEach(f => {
            if (!f.endsWith('.js')) return;
            const response = client.loadCommand(f, fo);
            if (response) client.logger.error(response);
        });
    });
    client.logger.info(`Commands loaded.`);
}