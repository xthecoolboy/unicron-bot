const { MessageReaction, User, MessageEmbed } = require('discord.js');
const Client = require('../classes/Unicron');
const BaseEvent = require('../classes/BaseEvent');
const Blacklist = require('../modules/Blacklist');

module.exports = class extends BaseEvent {
    constructor() {
        super('messageReactionAdd');
    }
    /**
     * @param {Client} client
     * @param {MessageReaction} reaction
     * @param {User} user
     */
    async run(client, reaction, user) {
        try {
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;
            if (await Blacklist(client, user.id, reaction.message.guild.id)) return;
            const guild = await client.database.guilds.fetch(reaction.message.guild.id, true);
            const isReact = guild.verification('type');
            const channel_id = guild.verification('channel');
            const status = guild.verification('enabled');
            const role = guild.verification('role');
            if (!role
                || !status
                || (channel_id !== reaction.message.channel.id)
                || (isReact !== 'react')
                || (reaction.emoji.name !== 'yes')
                || !reaction.message.guild.me.permissions.has(['MANAGE_ROLES'])
            ) return;
            const member = await reaction.message.guild.members.fetch(user.id);
            if (member) {
                member.roles.add(role).catch(() => {});
                reaction.message.channel.send(new MessageEmbed()
                    .setColor(0x00FF00)
                    .setTimestamp()
                    .setDescription(`You have been verified <@${user.id}>`)
                ).then(async m => {
                    await m.delete({ timeout: 5000 }).catch(() => {});
                });
            }
        } catch (e) {
            client.logger.error(e);
        }
    }
}