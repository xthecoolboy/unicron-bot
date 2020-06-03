
const Discord = require('discord.js');
const ms = require('ms')

module.exports = {
    /**
     * 
     * @param {Discord.Client} client Client
     * @param {Discord.Message} message Message
     * @param {Array} args Arguments
     */
    run: async function (client, message, [user, ...reason]) {
        let target;
        if (message.mentions.users.size) target = message.mentions.users.first();
        else if (user) target = await client.user.fetch(user);
        if (!target) {
            return message.channel.send(new Discord.MessageEmbed()
                .setColor('RED')
                .setDescription(`Incorrect Usage, the corrage usages are:\n\`${this.options.usage}\``)
                .setTimestamp()
                .setFooter(message.author.tag, message.author.displayAvatarURL() || client.user.displayAvatarURL())
            );
        }
        if (target.equals(message.author)) {
            return message.channel.send(new Discord.MessageEmbed()
                .setColor('RED')
                .setDescription(`Hey there, You can\'t ban yourself :P`)
                .setTimestamp()
                .setFooter(message.author.tag, message.author.displayAvatarURL() || client.user.displayAvatarURL())
            );
        }
        const member = await message.guild.members.fetch(target.id);
        if (member) {
            if (message.author.id !== message.guild.ownerID && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) {
                return message.channel.send(new Discord.MessageEmbed()
                    .setColor('RED')
                    .setTimestamp()
                    .setFooter(message.author.tag, message.author.displayAvatarURL() || client.user.displayAvatarURL())
                    .setDescription('You can\'t ban a member who has a higher or equal to your highest role.')
                );
            }
            if (!member.bannable) {
                return message.channel.send(new Discord.MessageEmbed()
                    .setColor('RED')
                    .setDescription('You can\'t ban that member.')
                    .setTimestamp()
                    .setFooter(message.author.tag, message.author.displayAvatarURL() || client.user.displayAvatarURL())
                );
            }
        } else {
            return message.channel.send(new Discord.MessageEmbed()
                .setColor('RED')
                .setDescription(`You can't ban a user that is not on this server. ;-;`)
                .setTimestamp()
                .setFooter(message.author.tag, message.author.displayAvatarURL() || client.user.displayAvatarURL())
            );
        }
        const duration = reason[0] ? ms(reason[0]) : false;
        const _reason = reason ? reason.join(' ') : 'No reason provided.';
        const modchannel = await client.channels.fetch(await message.guild.db.moderation('modLogChannel'));
        try {
            await member.ban({
                days: 7,
                reason: _reason,
            });
            if (duration && !isNaN(duration)) {
                setTimeout(() => {
                    message.guild.members.unban(target.id);
                }, duration);
            }
        } catch (e) {
            return message.channel.send(new Discord.MessageEmbed()
                .setColor('RED')
                .setDescription(`Unexpected error occured. Member was not banned`)
                .setTimestamp()
                .setFooter(message.author.tag, message.author.displayAvatarURL() || client.user.displayAvatarURL())
            );
        }
        message.channel.send(`Successfully banned ${target.tag}`)
        if (modchannel && modchannel.type === 'text') {
            modchannel.send(new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setAuthor(`${message.author.tag} / ${message.author.id}`, message.author.displayAvatarURL() || message.guild.iconURL())
                .setTimestamp()
                .setThumbnail(target.displayAvatarURL() || null)
                .setDescription(`**Member** : ${target.tag} / ${target.id}\n**Action** : Ban\n${duration ? `**Length** : ` : ''}\n**Reason** : ${_reason}`)
            );
        }
        try {
            const dm = await target.createDM();
            await dm.send(new Discord.MessageEmbed()
                .setTimestamp()
                .setTitle(`You have been banned from ${message.guild.name} / ${message.guild.id}`)
                .setDescription(`Reason : ${reason}`)
                .setFooter(`You we\'re banned by ${message.author.tag} / ${message.author.id}`, message.author.displayAvatarURL() || message.guild.iconURL())
            );
        } catch (e) {

        }
    },
    config: {
        name: 'ban',
        description: 'Ban a member from the server!',
        permission: 'Server Moderator',
    },
    options: {
        aliases: [],
        clientPermissions: ['BAN_MEMBERS'],
        cooldown: 10,
        nsfwCommand: false,
        args: true,
        usage: 'ban [UserMention|UserID|UserTag] [...Reason]\nban [UserMention|UserID|UserTag] [Duration][s|m|h|d] [...Reason]',
        donatorOnly: false,
        premiumServer: false,
    }
}