require('dotenv').config();
require('./prototypes/Array');
require('./prototypes/Number');
require('./prototypes/Object');
require('./prototypes/String');
require('./listeners/process');
require('./database/Connection');
require('./server/server');
require('./cli');

const { Logger } = require('./utils');

const { ShardingManager } = require('discord.js');

const Manager = new ShardingManager('./src/bot.js', {

    token: process.env.BOT_TOKEN,

    totalShards: 3,

    shardArgs: ['--shard']

});

Manager.spawn();

Manager.on('shardCreate', (shard) => {

    Logger.info(`Shard[${shard.id}] has been created!`, 'Shard');

    shard.on('ready', () => {

        Logger.info(`Shard[${shard.id}] is now ready!`, 'Shard');

    });

    shard.on('death', (child) => {

        Logger.error(`Shard[${shard.id}][${child.pid}] Death`, 'Shard');

    });

    shard.on('disconnect', () => {

        Logger.error(`Shard[${shard.id}] Disconnection`, 'Shard');

    });

    shard.on('error', (err) => {

        Logger.error(`Shard[${shard.id}] Error : ${err.name}`, 'Shard');

    });

    shard.on('reconnecting', () => {

        Logger.info(`Shard[${shard.id}] reconnecting...`, 'Shard');

    });

    shard.on('spawn', (child) => {

        Logger.info(`Shard[${shard.id}][${child.pid}] has been spawned!`, 'Shard');

    });
    
});