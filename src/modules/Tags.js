
const { Message } = require('discord.js');

/**
 * @param {Message} message
 */
module.exports = async (message, tag) => {
    return await message.guild.db.tags({ action: 'fetch', name: tag });
}