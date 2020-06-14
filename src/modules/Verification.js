
const { Message, MessageEmbed } = require('discord.js');
const Client = require('../classes/Unicron');

/**
 * @param {Client} client
 * @param {Message} message
 */
module.exports = (client, message) => {
    return new Promise(async (resolve, reject) => {
        try {
            const channel_id = await message.guild.db.verification('channel');
            const type = await message.guild.db.verification('type');
            const role = await message.guild.db.verification('role');
            const enabled = await message.guild.db.verification('enabled');
            const stat = (!enabled || !role || !channel_id) ? true : false;
            if (stat) return resolve(false);
            if (channel_id !== message.channel.id) return resolve(false);
            if (message.deletable) message.delete({ timeout: 1000 });
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
                m.delete({ timeout: 10000});
                message.member.roles.add(role);
                resolve(true);
            });
        } catch (e) {
            reject(e);
        }
    });
}