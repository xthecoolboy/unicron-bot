
const { Guild, MessageEmbed } = require('discord.js');

const Client = require('../classes/Unicron');

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
        .setColor('RANDOM')
        .setAuthor(`${guild.name} / ${guild.id}`)
        .setImage(guild.splash ? guild.splashURL() : null)
        .setThumbnail(guild.icon ? guild.iconURL() : `https://dummyimage.com/128/7289DA/FFFFFF/&text=${encodeURIComponent(guild.nameAcronym)}`)
        .addField('Owner', `${guild.owner.user.tag} / ${guild.ownerID}`)
        .addField('Created At', guild.createdAt.toUTCString())
        .addField('Region', guild.region.toUpperCase(), true)
        .addField('Members', guild.memberCount, true)
        .addField('Emojis', guild.emojis.cache.size, true)
        .addField('Channel Categories', guild.channels.cache.filter(channel => channel.type === 'category').size, true)
        .addField('Text Channels', guild.channels.cache.filter(channel => channel.type === 'text').size, true)
        .addField('Voice Channels', guild.channels.cache.filter(channel => channel.type === 'voice').size, true)
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