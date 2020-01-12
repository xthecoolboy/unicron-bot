
const { MessageEmbed } = require('discord.js');
const { discord } = require('../utils/Regex.js');

module.exports = (client, message) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (await guild.inviteFilter() && message.content.match(discord.invite)) {
                resolve(true);
            } else { 
                return resolve(false);
            }
            if (message.deletable) {
                message.delete();
            }
            await message.channel.send(`No Advertising! ${message.author}`).them(m => {
                m.delete(3000);
            });
            const mChannel = message.guild.channels.cache.get(await guild.getModLogChannel());
            if (mChannel) {
                mChannel.send(new MessageEmbed()
                    .setAuthor(message.author.tag)
                    .setTitle('Advertising')
                    .setTimestamp()
                );
            }
        } catch (e) {
            reject(e);
        }
    });
}