require('./prototypes/Array');
require('./prototypes/Number');
require('./prototypes/Object');
require('./prototypes/String');

const http = require('http');
const express = require('express');
const Client = require('./classes/Unicron');

/**
 * @param {Client} client
 */
module.exports = async (client) => {
    client.logger.info('Loading Libraries...');
    if (process.env.BOT_HOST_URL) {
        const app = express();
        app.get('/', (request, response) => {
            client.logger.info(`GET - ${Math.floor(Math.random() * 100)} received.`)
            response.sendStatus(200);
        });
        app.listen(process.env.PORT || 4200);
        client.setInterval(() => {
            http.get(process.env.BOT_HOST_URL);
        }, 280000);
    }
    await require('./database/database.js').SyncDatabase();
}