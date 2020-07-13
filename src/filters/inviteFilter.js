
const { Message, MessageEmbed } = require('discord.js');
const Client = require('../classes/Unicron');
const AutoModeration = require('../modules/AutoModeration');
const { Regex } = require('../utils/');

/**
 * @param {Client} client
 * @param {Message} message
 */
module.exports = (client, message) => {
    return new Promise(async (resolve, reject) => {
        try {
            const status = message.guild.db.filters('inviteFilter');
            const strat = (status && (message.author.permLevel < 2) && message.content.match(Regex.discord.invite)) ? true : false;
            if (!strat) return resolve(false);
            if (message.deletable) message.delete().catch(() => { });
            message.channel.send(`No Advertising! ${message.author}.`)
                .then(msg => msg.delete({ timeout: 5000 }).catch(() => { }));
            const mChannel = message.guild.channels.cache.get(message.guild.db.moderation('modLogChannel'));
            if (mChannel) {
                mChannel.send(new MessageEmbed()
                    .setTimestamp()
                    .setAuthor(client.user.tag, client.user.displayAvatarURL({ dynamic: true }))
                    .setTitle('Invite Blocker')
                    .setDescription(`Member: ${message.author.tag} / ${message.author.id}`)
                ).catch(() => { });
            }
            await AutoModeration(client, message, message.member).catch(() => { });
            return resolve(true);
        } catch (e) {
            reject(e);
        }
    });
}