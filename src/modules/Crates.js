
const { Collection } = require('discord.js');
const { promisify } = require('util');
const readdir = promisify(require('fs').readdir);

module.exports = async (client) => {
    client.crates = new Collection();
    const itemFiles = await readdir('./src/crates/');
    itemFiles.forEach(f => {
        if (!f.endsWith('.js')) return;
        const response = client.loadCrate(f);
        if (response) client.logger.error(response);
    });
}