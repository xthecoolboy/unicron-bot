const { GuildMember } = require('discord.js');
const Member = require('../classes/GuildMember');
const Client = require('../classes/Unicron');
const BaseEvent = require('../classes/BaseEvent');
const Blacklist = require('../modules/Blacklist');

module.exports = class extends BaseEvent {
    constructor() {
        super('guildMemberRemove');
    }
    /**
     * @param {Client} client
     * @param {GuildMember} member
     */
    async run(client, member) {
        if (member.user.bot) return;
        if (await Blacklist(client, member.user.id, member.guild.id)) return;
        const tmp = new Member(member.user.id, member.guild.id);
        await tmp.captcha.regenerate();
        const guild = await client.database.guilds.fetch(member.guild.id);
        const channel_id = guild.leaver('channel');
        const message = guild.leaver('message');
        const enabled = guild.leaver('enabled');
        if (!channel_id || !enabled || !message) return;
        const channel = await client.channels.fetch(channel_id);
        if (!channel) return;
        channel.send(message.replace('{user}', member.user.tag));
    }
}