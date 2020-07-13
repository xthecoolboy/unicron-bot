
const { Message, MessageEmbed } = require('discord.js');
const AutoModeration = require('../modules/AutoModeration');
const fs = require('fs');
const Client = require('../classes/Unicron');
const swearWords = fs.readFileSync('assets/swearWords.txt').toString().split('\r\n');

/**
 * @param {Client} client
 * @param {Message} message
 */
module.exports = (client, message) => {
    return new Promise(async (resolve, reject) => {
        try {
            const status = message.guild.db.filters('swearFilter');
            const strat = (status && !message.channel.nsfw && message.author.permLevel < 3 &&
                (
                    message.content.match(new RegExp(swearWords.map(client.escapeRegex).join('|'), 'gi'))
                )
            ) ? true : false;
            if (!strat) return resolve(false);
            if (message.deletable) message.delete().catch(() => { });
            message.channel.send(`No Swearing! ${message.author}.`)
                .then(msg => msg.delete({ timeout: 5000 }));
            const mChannel = message.guild.channels.cache.get(message.guild.db.moderation('modLogChannel'));
            if (mChannel) {
                mChannel.send(new MessageEmbed()
                    .setTimestamp()
                    .setAuthor(client.user.tag, client.user.displayAvatarURL({ dynamic: true }))
                    .setTitle('Swear Blocker')
                    .setDescription(`Member: ${message.author.tag} / ${message.author.id}`)
                ).catch(() => { });
            }
            await AutoModeration(client, message, message.member);
            resolve(true);
        } catch (e) {
            reject(e);
        }
    });
}