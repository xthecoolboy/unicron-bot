
const { Client, Message, MessageEmbed } = require('discord.js');
const Guild = require('../handlers/Guild');
const Member = require('../handlers/Member');
const ms = require('ms');

/** Example
 * ```js
 * await autoMod(client, message, {
 *      guild_id: 1231312313213131
 *      user_id: 1231241252617546
 * });
 * ```
 * 
 * @param {Client} client
 * @param {Message} Message
 * @param {JSON} data
 * 
 */
module.exports = (client, message) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!message.guild.me.permissions.has(['BAN_MEMBERS', 'MANAGE_ROLES', 'MANAGE_CHANNELS', 'KICK_MEMBERS'])) return;
            const g = new Guild(message.guild.id);
            const member = message.guild.member(message.author.id);
            const gdb = await g.moderation(true);
            const strat = gdb.autoModeration;
            const act = gdb.autoModAction;
            const action = act.toLowerCase();
            if (!strat || !act) return resolve(false);
            const duration = await g.moderation('warnActionExpiresOn');
            const reason = 'Auto Moderation';
            switch (act) {
                case 'MUTE': {
                    let role = message.guild.roles.cache.get(gdb.mutedRole) || message.guild.roles.cache.find((r) => { return r.name === 'Muted' });
                    if (!role) {
                        role = await message.guild.roles.create({
                            name: 'Muted'
                        });
                        gdb.mutedRole = role.id;
                        await gdb.save();
                    }
                    await member.roles.add(role, reason);
                    for (let channel of message.guild.channels.cache.filter(channel => channel.type === 'text')) {
                        channel = channel[1];
                        if (!channel.permissionOverwrites.get(role.id)) {
                            await channel.overwritePermissions(role, {
                                SEND_MESSAGES: false,
                                ADD_REACTIONS: false
                            });
                        }
                    }
                    if (duration && !isNaN(duration)) {
                        try {
                            setTimeout(() => {
                                member.roles.remove(role, 'Mute Duration expired');
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
                    );
                    setTimeout(() => {
                        message.guild.members.unban(member.user.id);
                    }, 1000);
                    break;
                }
                case 'BAN': {
                    await message.guild.members.ban(member.user.id,
                        {
                            days: 7,
                            reason,
                        }
                    );
                    if (duration && !isNaN(duration)) {
                        try {
                            setTimeout(() => {
                                message.guild.members.unban(member.user.id);
                            }, Number(duration));
                        } catch (E) {

                        }
                    }
                }
            }
            const modchannel = await client.channels.fetch(gdb.modLogChannel);
            if (modchannel && modchannel.type === 'text') {
                modchannel.send(new MessageEmbed()
                    .setColor('RANDOM')
                    .setAuthor(`${client.user.tag} / ${client.user.id}`, client.user.displayAvatarURL())
                    .setTimestamp()
                    .setThumbnail(message.author.displayAvatarURL() || null)
                    .setDescription(`**Member** : ${message.author.tag} / ${message.author.id}\n**Action** : ${action}\n${duration ? `**Length** : ${ms(duration)}` : ''}\n**Reason** : ${reason}`)
                );
            }
            try {
                const dm = await target.createDM();
                await dm.send(new MessageEmbed()
                    .setTimestamp()
                    .setTitle(`You have been ${action} from ${message.guild.name}`)
                    .setDescription(`Reason : ${reason}`)
                    .setFooter(`Moderator : ${client.user.tag} / ${client.user.id}`, client.user.displayAvatarURL())
                );
            } catch (e) {
                //
            }
            resolve(true);
        } catch (e) {
            console.log(e);
            resolve(false);
        }
    });
}