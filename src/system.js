require('./prototypes/Array');
require('./prototypes/Number');
require('./prototypes/Object');
require('./prototypes/String');

const http = require('http');
const express = require('express');

module.exports = async (client) => {
    await client.logger.info('Initializing Unicron...');
    if (process.env.BOT_HOST_URL) {
        const app = express();
        app.get('/', (request, response) => {
            client.logger.info(`GET - ${Math.floor(Math.random() * 100)} received.`)
            response.sendStatus(200);
        });
        app.listen(4200);
        client.setInterval(() => {
            http.get(process.env.BOT_HOST_URL);
        }, 280000);
    }
    await client.logger.info('Loading functions...');
    await require('./utils/functions')(client);
    await client.logger.info('Functions loaded.');
    await client.logger.info('Loading modules...');
    await require('./modules/')(client);
    await client.logger.info('Modules loaded.');
    await require('./database/database.js').SyncDatabase();
}