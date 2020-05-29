
const { Client, Message, MessageEmbed } = require('discord.js');

const fs = require('fs');
const swearWords = fs.readFileSync('assets/swearWords.txt').toString().split('\r\n');
const swearRegex = fs.readFileSync('assets/swearRegex.txt').toString().split('\r\n');

const reEscape = s => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

/**
 * @param {Client} client
 * @param {Message} message
 */
module.exports = (client, message) => {
    return new Promise(async (resolve, reject) => {
        try {
            const status = await message.guild.db.filters('swearFilter');
            const strat = (status && !message.channel.nsfw && message.author.permLevel < 3 && 
                (
                    message.content.match(new RegExp(swearWords.map(reEscape).join('|'), 'gim')) ||
                    message.content.match(new RegExp(swearRegex.map(reEscape)), 'gim')
                )
            ) ? true: false;
            if (!strat) return resolve(false);
            if (message.deletable) message.delete();
            await message.channel.send(`No Swearing! ${message.author}.`)
                .then(msg => msg.delete({ timeout: 5000}));
            const mChannel = message.guild.channels.resolve(await message.guild.db.moderation('modLogChannel'));
            if (mChannel) {
                mChannel.send(new MessageEmbed()
                    .setTimestamp()
                    .setAuthor(client.user.tag, client.user.displayAvatarURL())
                    .setTitle('Swear Blocker')
                    .setDescription(`Member: ${message.author.tag} / ${message.author.id}`)
                );
            }
            resolve(true);
        } catch (e) {
            reject(e);
        }
    });
}