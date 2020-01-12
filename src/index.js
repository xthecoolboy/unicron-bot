
require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();

require('./listeners')(client);
require('./bot')(client);


client.login(process.env.BOT_TOKEN);