const { MessageReaction, User, MessageEmbed } = require('discord.js');
const Client = require('../classes/Unicron');
const Guild = require('../handlers/Guild');

/**
 * @param {Client} client
 * @param {MessageReaction} reaction
 * @param {User} user
 */
module.exports = async (client, reaction, user) => {
    try {
        if (reaction.partial) await reaction.fetch(); 
        if (user.bot) return;
        if (!reaction.message.guild) return;
        const guild = new Guild(reaction.message.guild.id);
        const isReact = await guild.verification('type');
        const channel_id = await guild.verification('channel');
        const status = await guild.verification('enabled');
        const role = await guild.verification('role');
        if (!role || !status || (channel_id !== reaction.message.channel.id) || (isReact !== 'react')) return;
        if (reaction.message.author.id !== client.user.id) return;
        if (reaction.emoji.name !== 'yes') return;
        const member = await reaction.message.guild.members.fetch(user.id);
        if (member) {
            member.roles.add(role);
            reaction.message.channel.send(new MessageEmbed()
                .setColor(0x00FF00)
                .setDescription(`You have been verified <@${user.id}>`)
            ).then(async m => {
                await m.delete({ timeout: 5000 });
            });
        }
    } catch (e) {
        client.logger.error(e);
    }
}