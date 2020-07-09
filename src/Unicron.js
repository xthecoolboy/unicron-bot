require('dotenv').config();
require('./listeners/process');
const Unicron = require('./classes/Unicron');
const client = new Unicron();

(async function () {
    await client.registerItems('../items/');
    await client.registerCommands('../commands/');
    await client.registerEvents('../events/');
    await client.login(process.env.BOT_TOKEN);
})();