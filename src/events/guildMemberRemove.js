const { Client, GuildMember } = require('discord.js');

const Guild = require('../handlers/Guild');
/**
 * @param {Client} client
 * @param {GuildMember} member
 */
module.exports = async (client, member) => {
    if (member.user.bot) return;
    const guild = new Guild(member.guild.id);
    const channel_id = await guild.leaver('channel');
    const message = await guild.leaver('message');
    const enabled = await guild.leaver('enabled');
    if (!channel_id || !enabled || !message) return;
    const channel = await client.channels.fetch(channel_id);
    if (!channel) return;
    channel.send(message.replace('{user}', member.user));
}