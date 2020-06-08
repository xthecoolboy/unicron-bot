
const Discord = require('discord.js');
const ms = require('ms');
const Member = require('../../handlers/Member');
const Warning = require('../../modules/Warning');

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
        else if (user) target = await client.users.fetch(user);
        if (!target || target.bot) {
            return message.channel.send(new Discord.MessageEmbed()
                .setColor('RED')
                .setDescription(`Incorrect Usage, the correct usages are:\n\`${this.options.usage}\``)
                .setTimestamp()
                .setFooter(message.author.tag, message.author.displayAvatarURL() || client.user.displayAvatarURL())
            );
        }
        if (target.equals(message.author)) {
            return message.channel.send(new Discord.MessageEmbed()
                .setColor('RED')
                .setDescription(`Hey there, You can't warn yourself :P`)
                .setTimestamp()
                .setFooter(message.author.tag, message.author.displayAvatarURL() || client.user.displayAvatarURL())
            );
        }
        const member = message.guild.member(target);
        if (member) {
            if (message.author.id !== message.guild.ownerID && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) {
                return message.channel.send(new Discord.MessageEmbed()
                    .setColor('RED')
                    .setTimestamp()
                    .setFooter(message.author.tag, message.author.displayAvatarURL() || client.user.displayAvatarURL())
                    .setDescription('You can\'t warn a member who has a higher or equal to your highest role.')
                );
            }
        } else {
            return message.channel.send(new Discord.MessageEmbed()
                .setColor('RED')
                .setDescription(`You can't warn a user that is not on this server. Or that user doesn't exist`)
                .setTimestamp()
                .setFooter(message.author.tag, message.author.displayAvatarURL() || client.user.displayAvatarURL())
            );
        }
        const duration = reason[0] ? ms(reason[0]) : false;
        if (duration) reason.shift();
        const _reason = reason ? reason.join(' ') : 'No reason provided.';
        const instance = new Member(target.id, message.guild.id);
        try {
            const stat = await instance.warnings.add({
                reason: _reason,
                issued_by: `${message.author.tag} / ${message.author.id}`,
            });
            if (!stat) throw 'error';
            if (duration && !isNaN(duration)) {
                setTimeout(() => {
                    instance.warnings.remove(stat);
                }, Number(duration));
            }
            message.channel.send(`Successfully warned ${target}`);
        } catch (e) {
            return message.channel.send('Member was not warned. unexpected error occured.');
        }
        const modChannel = await client.channels.fetch(await message.guild.db.moderation('modLogChannel'));
        if (modChannel) {
            modChannel.send(new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setAuthor(`${message.author.tag} / ${message.author.id}`, message.author.displayAvatarURL() || message.guild.iconURL())
                .setTimestamp()
                .setThumbnail(target.displayAvatarURL() || null)
                .setDescription(`**Member** : ${target.tag} / ${target.id}\n**Action** : Warn\n${duration ? `**Length** : ${ms(duration)}` : ''}\n**Reason** : ${_reason}`)
            );
        }
        try {
            const dm = await target.createDM();
            await dm.send(new Discord.MessageEmbed()
                .setTimestamp()
                .setTitle(`You have been warned from ${message.guild.name}`)
                .setDescription(`Reason : ${_reason}`)
                .setFooter(`Moderator : ${message.author.tag} / ${message.author.id}`, message.author.displayAvatarURL() || message.guild.iconURL())
            );
        } catch (e) {

        }
        await Warning(client, message);
    },
    config: {
        name: 'warn',
        description: 'Warns the specified user. If warning threshold reaches for a user some action, specified by the `warnTresholdAction` configuration, is taken.',
        permission: 'Server Moderator',
    },
    options: {
        aliases: [],
        clientPermissions: ['BAN_MEMBERS', 'KICK_MEMBERS', 'MANAGE_ROLES', 'MANAGE_CHANNELS'],
        cooldown: 10,
        nsfwCommand: false,
        args: true,
        usage: 'warn [UserMention|UserID] [Duration](Optional) [...Reason](Optional)',
        donatorOnly: false,
        premiumServer: false,
    }
}