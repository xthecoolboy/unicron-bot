
const fs = require('fs');
const swearWords = fs.readFileSync('assets/swearWords.txt').toString().split('\n');
const { MessageEmbed } = require('discord.js');

module.exports = (client, message) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (await message.data.noSwear() && swearWords.some(word => message.content.includes(word)) && !message.channel.nsfw) {
                resolve(true);
            } else { 
                return resolve(false);
            }
            message.delete();
            message.channel.send(`No swearing! ${message.author}`).then(m => {
                m.delete(3000);
            });
            const mChannel = message.guild.channels.cache.get(await guild.getModLogChannel());
            if (mChannel) {
                mChannel.send(new MessageEmbed()
                    .setAuthor(message.author.tag)
                    .setTitle(`Swearing`)
                    .setDescription(`||${message.content}||`)
                    .setTimestamp()
                );
            }
        } catch (e) {
            reject(e);
        }
    });
}