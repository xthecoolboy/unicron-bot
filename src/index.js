
require('dotenv').config();

if (process.env.BOT_HOST_URL) {
    const http = require("http");
    const express = require("express");
    const app = express();
    app.get("/", (request, response) => {
        console.log(Date.now().toHumanString() + " ping Received");
        response.sendStatus(200);
    });
    app.listen(4200);
    setInterval(() => {
        http.get(process.env.BOT_HOST_URL);
    }, 280000);
    app.get('/', (request, response) => {
        response.sendStatus(200);
    });
}

require('./prototypes/Array');
require('./prototypes/Number');
require('./prototypes/Object');
require('./prototypes/String');

const Discord = require('discord.js');
const { Unicron } = require('./handlers/Unicron');

const client = new Discord.Client({
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

client.unicron = new Unicron({
    owner: process.env.BOT_OWNER_ID,
    server: process.env.BOT_SERVER_ID,
    channel: process.env.BOT_CHANNEL_ID,
    modChannel: process.env.BOT_MODCHANNEL_ID,
    hostURL: process.env.BOT_HOST_URL,
    moderatorRole: process.env.BOT_MODERATOR_ROLE,
    adminRole: process.env.BOT_ADMINSTRATOR_ROLE,
    inviteURL: process.env.BOT_SERVER_URL
});

require('./bot')(client);

client.login(process.env.BOT_TOKEN);