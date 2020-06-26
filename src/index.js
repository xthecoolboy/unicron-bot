require('dotenv').config();

require('./prototypes/Array');

require('./prototypes/Number');

require('./prototypes/Object');

require('./prototypes/String');

require('./database/Connection');

const Unicron = require('./classes/Unicron');

const client = new Unicron();

(async function () {

    await client.register();

    await client.registerItems('../items/');

    await client.registerCommands('../commands/');

    await client.registerEvents('../events/');

    await client.superlogin(process.env.BOT_TOKEN, process.env.PORT);

})();