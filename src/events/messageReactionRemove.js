const { Client, MessageReaction, User, MessageEmbed } = require('discord.js');

const Guild = require('../handlers/Guild');
/**
 * @param {Client} client
 * @param {MessageReaction} reaction
 * @param {User} user
 */
module.exports = async (client, reaction, user) => {
    try {
        if (!reaction.message.guild) return;
        const guild = new Guild(reaction.message.guild.id);
        const isReact = await guild.verification('type');
        const channel_id = await guild.verification('channel');
        const status = await guild.verification('enabled');
        const role = await guild.verification('role');
        if (reaction.message.author !== client.user.id || !role || !status || (channel_id !== reaction.message.channel.id) || (isReact !== 'react')) return;
        if (reaction.emoji.name !== 'yes') return;
        const member = await reaction.message.guild.members.fetch(user.id);
        if (member) member.roles.remove(role);
        const dm = await user.createDM();
        dm.send(new MessageEmbed()
            .setColor(0x00FF00)
            .setDescription(`You have been unverified from ${reaction.message.guild.name}`)
        );
    } catch (e) {
        client.logger.error(e);
    }
}