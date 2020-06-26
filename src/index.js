require('dotenv').config();
require('./prototypes/Array');
require('./prototypes/Number');
require('./prototypes/Object');
require('./prototypes/String');
require('./database/Connection');
require('./listeners/process');
require('./server/server');
require('./cli');

const Unicron = require('./classes/Unicron');

const client = new Unicron();

(async function () {

    await client.registerItems('../items/');

    await client.registerCommands('../commands/');

    await client.registerEvents('../events/');

    await client.login(process.env.BOT_TOKEN);
    
})();