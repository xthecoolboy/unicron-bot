const { Guild, MessageEmbed } = require('discord.js');
const Client = require('../classes/Unicron');
const BaseEvent = require('../classes/BaseEvent');
const Blacklist = require('../modules/Blacklist');

module.exports = class extends BaseEvent {
    constructor() {
        super('guildCreate');
    }
    /**
     * @param {Client} client
     * @param {Guild} guild
     */
    async run(client, guild) {
        if (await Blacklist(client, null, guild.id)) {
            await guild.leave();
            return;
        }
        const channel = await client.channels.fetch(client.unicron.channel, false);
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
        client.shard.broadcastEval(`
            this.user.setPresence({
                activity: {
                    name: \`${await client.getCount('guilds')} guilds! | ?help\`,
                    type: 'LISTENING',
                },
                status: 'online',
            });
        `);
    }
}