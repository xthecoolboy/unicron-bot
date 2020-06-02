
const { Client } = require('discord.js');

/**
 * @param {Client} client
 */
module.exports = (client) => {
    client.user.setPresence({
        activity: { 
            name: `with ${client.users.cache.size} users!`, 
            type: 'PLAYING',
        }, 
        status: 'online',
    });
    client.logger.cmd(`Bot ready as \'${client.user.tag}\', \'${client.user.id}\' with ${client.commands.size} commands.`);
}