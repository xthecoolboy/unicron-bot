const { promisify } = require('util');
const readdir = promisify(require('fs').readdir);

module.exports = async (client) => {
    await client.logger.info('Loading Shop Items...');
    await (async function () {
        const itemFiles = await readdir('./src/items/');
        itemFiles.forEach(f => {
            if (!f.endsWith('.js')) return;
            const response = client.loadItem(f);
            if (response) client.logger.error(response);
        });
    })();
    await client.logger.info('Shop items loaded.');
}