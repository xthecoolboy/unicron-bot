
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
const dbots = require('dbots');

const client = new Discord.Client({
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    fetchAllMembers: false,
    messageCacheMaxSize: 100,
    messageSweepInterval: 30,
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

const poster = new dbots.Poster({
    client,
    apiKeys: {
        glennbotlist: process.env.GLENN_TOKEN,
        arcane: process.env.ARCANE_TOKEN,
        mythicalbots: process.env.MYTHICAL_TOKEN,
        listmybots: process.env.LMB_TOKEN,
        discordboats: process.env.BOAT_TOKEN,
        botsfordiscord: process.env.BFD_TOKEN,
        topgg: process.env.TOPGG_TOKEN,
        botsondiscord: process.env.BOD_TOKEN,
        discordbotsgg: process.env.DBG_TOKEN,
        discordbotlist: process.env.DBL_TOKEN,
    },
    clientLibrary: 'discord.js',
    clientID: '634908645896880128',
});

require('./bot')(client);

client.login(process.env.BOT_TOKEN).then(()=> {
    poster.startInterval();
});

