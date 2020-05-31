
require('dotenv').config();

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

console.log('Starting...');

require('./bot')(client);

client.login(process.env.BOT_TOKEN);