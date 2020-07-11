
const { Message, MessageEmbed, GuildMember } = require('discord.js');
const Client = require('../classes/Unicron');
const ms = require('ms');

/** Example
 * ```js
 * await autoMod(client, message, member);
 * ```
 * 
 * @param {Client} client
 * @param {Message} message
 * @param {GuildMember} member
 * 
 */
module.exports = (client, message, member) => {
    return new Promise(async (resolve, reject) => {
        try {
            const g = await client.database.guilds.fetch(message.guild.id);
            const strat = g.moderation('autoModeration');
            const act = g.moderation('autoModAction');
            const action = act.toLowerCase();
            if (!strat) return resolve(false);
            const duration = g.moderation('warnActionExpiresOn');
            const reason = 'Auto Moderation';
            switch (act) {
                case 'MUTE': {
                    let role = message.guild.roles.cache.find((r) => { return r.name === 'Muted' });
                    if (!role) role = await message.guild.roles.create({ name: 'Muted' });
                    await member.roles.add(role, reason);
                    try {
                        for (let channel of message.guild.channels.cache.filter(channel => channel.type === 'text')) {
                            channel = channel[1];
                            if (!channel.permissionOverwrites.get(role.id)) {
                                await channel.createOverwrite(role, {
                                    SEND_MESSAGES: false,
                                    ADD_REACTIONS: false
                                }).catch(() => {});
                            }
                        }
                    } catch (e) {
            
                    }
                    if (duration && !isNaN(duration)) {
                        try {
                            setTimeout(() => {
                                member.roles.remove(role, 'Mute Duration expired').catch(() => {});
                            }, Number(duration));
                        } catch (E) {

                        }
                    }
                    break;
                }
                case 'KICK': {
                    await member.kick(reason);
                    break;
                }
                case 'SOFTBAN': {
                    await message.guild.members.ban(member.user.id,
                        {
                            days: 7,
                            reason,
                        }
                    ).catch(() => {});
                    setTimeout(() => {
                        message.guild.members.unban(member.user.id).catch(() => {});
                    }, 1000);
                    break;
                }
                case 'BAN': {
                    await message.guild.members.ban(member.user.id,
                        {
                            days: 7,
                            reason,
                        }
                    ).catch(() => {});
                    if (duration && !isNaN(duration)) {
                        try {
                            setTimeout(() => {
                                message.guild.members.unban(member.user.id).catch(() => {});
                            }, Number(duration));
                        } catch (E) {

                        }
                    }
                    break;
                }
                default:
                    return resolve(false);
            }
            const modchannel = await client.channels.fetch(g.moderation('modLogChannel'));
            if (modchannel && modchannel.type === 'text') {
                modchannel.send(new MessageEmbed()
                    .setColor('RANDOM')
                    .setAuthor(`${client.user.tag} / ${client.user.id}`, client.user.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()
                    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }) || null)
                    .setDescription(`**Member** : ${message.author.tag} / ${message.author.id}\n**Action** : ${action}\n**Reason** : ${reason}\n${duration ? `**Length** : ${ms(duration)}` : ''}`)
                ).catch(() => {});
            }
            try {
                const dm = await target.createDM();
                await dm.send(new MessageEmbed()
                    .setTimestamp()
                    .setTitle(`You have been ${action} from ${message.guild.name}`)
                    .setDescription(`Reason : ${reason}`)
                    .setFooter(`Moderator : ${client.user.tag} / ${client.user.id}`, client.user.displayAvatarURL({ dynamic: true }))
                ).catch(() => {});
            } catch (e) {
                //
            }
            return resolve(true);
        } catch (e) {
            console.log(e);
            resolve(false);
        }
    });
}