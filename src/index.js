require('dotenv').config();
const UnicronClient = require('./classes/Unicron');
const options = require('./options');
const Unicron = new UnicronClient(options);
(async function () {
    await Unicron.require('../system.js');
    await Unicron.login(process.env.BOT_TOKEN);
})();