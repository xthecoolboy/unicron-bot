require('dotenv').config();
const Unicron = require('./classes/Unicron');
const options = require('./options');
const client = new Unicron(options);
(async function () {
    await client.require('../system.js');
    await client.login(process.env.BOT_TOKEN);
})();