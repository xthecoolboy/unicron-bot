
const { Message, MessageEmbed } = require('discord.js');
const Client = require('../classes/Unicron');

/**
 * @param {Client} client
 * @param {Message} message
 */
module.exports = (client, message) => {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await client.database.guilds.fetch(message.guild.id, true);
            const channel_id = db.verification('channel');
            const type = db.verification('type');
            const role = db.verification('role');
            const enabled = db.verification('enabled');
            const stat = (!enabled || !role || !channel_id) ? true : false;
            if (stat || (channel_id !== message.channel.id)) return resolve(false);
            if (message.deletable) message.delete({ timeout: 1000 }).catch(() => { });
            if (type === 'react') return resolve(false);
            let verified = false;
            if (type === 'discrim') {
                verified = message.content === `I am ${message.author.discriminator}`;
            } else if (type === 'captcha') {
                const cptcha = await message.member.db.captcha.fetch();
                verified = message.content === `>verify ${cptcha}`;
            }
            if (!verified) return;
            message.channel.send(new MessageEmbed()
                .setColor(0x00FF00)
                .setTimestamp()
                .setDescription(`<@${message.author.id}>, you have been verified!`)
            ).then((m) => {
                m.delete({ timeout: 5000 }).catch(() => { });
                if (!message.member.roles.cache.has(role)) message.member.roles.add(role).catch(() => { });
                resolve(true);
            }).catch(() => { });
        } catch (e) {
            reject(e);
        }
    });
}