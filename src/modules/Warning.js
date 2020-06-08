const { Client, Message, MessageEmbed } = require('discord.js')

/**
 * @param {Client} client
 * @param {Message} message
 */
module.exports = (client, message) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!message.guild.me.permissions.has(['BAN_MEMBERS', 'MANAGE_ROLES', 'MANAGE_CHANNELS', 'KICK_MEMBERS'])) return;
            const model = await message.guild.db.moderation(true);
            const maxTreshold = model.maxWarnTreshold;
            const member = message.guild.member(message.author.id);
            const action = model.warnTresholdAction;
            const faction = action.toLowerCase();
            const duration = model.warnActionExpiresOn;
            const warns = await message.member.db.warnings.fetchAll();
            const reason = 'Warn Treshold Reached!';
            if (!maxTreshold || !action || maxTreshold < warns) return resolve(false);
            switch (action) {
                case 'MUTE': {
                    let role = message.guild.roles.cache.get(model.mutedRole) || message.guild.roles.cache.find((r) => { return r.name === 'Muted' });
                    if (!role) {
                        role = await message.guild.roles.create({
                            name: 'Muted'
                        });
                        model.mutedRole = role.id;
                        await model.save();
                    }
                    await member.roles.add(role, reason);
                    for (let channel of message.guild.channels.cache.filter(channel => channel.type === 'text' && channel.viewable)) {
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
                    break;
                }
                default:
                    return resolve(false);
            }
            const modchannel = await client.channels.fetch(model.modLogChannel);
            if (modchannel && modchannel.type === 'text') {
                modchannel.send(new MessageEmbed()
                    .setColor('RANDOM')
                    .setAuthor(`${client.user.tag} / ${client.user.id}`, client.user.displayAvatarURL())
                    .setTimestamp()
                    .setThumbnail(message.author.displayAvatarURL() || null)
                    .setDescription(`**Member** : ${message.author.tag} / ${message.author.id}\n**Action** : ${faction}\n${duration ? `**Length** : ${ms(duration)}` : ''}\n**Reason** : ${reason}`)
                );
            }
            try {
                const dm = await target.createDM();
                await dm.send(new MessageEmbed()
                    .setTimestamp()
                    .setTitle(`You have been ${faction} from ${message.guild.name}`)
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