
const { MessageEmbed } = require('discord.js');

module.exports = (client, message) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (await message.data.noMentionSpam() && message.mentions.users.size >= 6) resolve(true);
            else return resolve(false);
            if (message.deletable) message.delete();
            await message.channel.send(`No Mention Spam! ${message.author}`).then(m => {
                m.delete(3000);
            });
            const mChannel = message.guild.channels.cache.get(await message.data.getModLogChannel());
            if (mChannel) {
                mChannel.send(new MessageEmbed()
                    .setAuthor(message.author.tag)
                    .setTitle('Mention Spamming')
                    .setTimestamp()
                );
            }
        } catch (e) {
            reject(e);
        }
    });
}