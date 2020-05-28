
const { Collection } = require('discord.js');
const { promisify } = require('util');
const readdir = promisify(require('fs').readdir);

module.exports = async (client) => {
    client.shopitems = new Collection();
    const itemFiles = await readdir('./src/items/');
    itemFiles.forEach(f => {
        if (!f.endsWith('.js')) return;
        const response = client.loadItem(f);
        if (response) client.logger.error(response);
    });
}