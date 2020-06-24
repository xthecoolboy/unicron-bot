require('dotenv').config();
require('./api/server');
const Unicron = require('./Unicron');
const client = new Unicron.Client();
(async function () {
    await client.register();
    await client.registerItems('../items/');
    await client.registerCommands('../commands/');
    await client.registerEvents('../events/');
    await client.login(process.env.BOT_TOKEN);
})();