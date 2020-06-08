
const { Guild, Client, MessageEmbed } = require('discord.js');

const {
    GuildSettings,
    GuildDynamicVoice,
    GuildFilter,
    GuildLeave,
    GuildWelcome,
    GuildModeration,
    GuildTicket,
    GuildVerification,
} = require('../database/database.js');

/**
 * @param {Client} client
 * @param {Guild} guild
 */
module.exports = async (client, guild) => {
    const channel = await client.channels.fetch(client.unicron.channel);
    channel.send(new MessageEmbed()
        .setTitle(`${guild.name} has invited Unicron`)
        .setThumbnail(guild.iconURL || client.user.displayAvatarURL())
        .addField('Owner', guild.owner.user.tag, true)
        .addField('Member Count', guild.memberCount, true)
        .addField('Channel Count', guild.channels.cache.size, true)
        .addField('Region', guild.region, true)
        .setTimestamp()
    );
    try {
        GuildSettings.create({ guild_id: guild.id });
        GuildDynamicVoice.create({ guild_id: guild.id });
        GuildFilter.create({ guild_id: guild.id });
        GuildLeave.create({ guild_id: guild.id });
        GuildWelcome.create({ guild_id: guild.id });
        GuildModeration.create({ guild_id: guild.id });
        GuildTicket.create({ guild_id: guild.id });
        GuildVerification.create({ guild_id: guild.id });
    } catch (e) {
        console.log(e);
    }
    client.user.setPresence({
        activity: { 
            name: `${client.guilds.cache.size} guilds!`, 
            type: 'LISTENING',
        }, 
        status: 'online',
    });
}