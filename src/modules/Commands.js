
const { Collection } = require('discord.js');
const { promisify } = require('util');
const readdir = promisify(require('fs').readdir);

module.exports = async (client) => {
    client.commands = new Collection();
    client.shopitems = new Collection();
    const itemFiles = await readdir('./src/items/');
    const cmds = await readdir('./src/commands/');
    itemFiles.forEach(f => {
        if (!f.endsWith('.js')) return;
        const response = client.loadItem(f);
        if (response) client.logger.error(response);
    });
    cmds.forEach(async (fo) => {
        const files = await readdir(`./src/commands/${fo}/`);
        files.forEach(f => {
            if (!f.endsWith('.js')) return;
            const response = client.loadCommand(f, fo);
            if (response) client.logger.error(response);
        });
    });
}