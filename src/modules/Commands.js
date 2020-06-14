const { promisify } = require('util');
const readdir = promisify(require('fs').readdir);

module.exports = async (client) => {
    await client.logger.info('Loading commands...');
    await (async function () {
        const cmds = await readdir('./src/commands/');
        cmds.forEach(async (fo) => {
            const files = await readdir(`./src/commands/${fo}/`);
            files.forEach(f => {
                if (!f.endsWith('.js')) return;
                const response = client.loadCommand(f, fo);
                if (response) client.logger.error(response);
            });
        });
    })();
    await client.logger.info(`Commands loaded.`);
}