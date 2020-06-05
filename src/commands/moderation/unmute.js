
const Discord = require('discord.js');

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
        if (!target) {
            return message.channel.send(new Discord.MessageEmbed()
                .setColor('RED')
                .setDescription(`Incorrect Usage, the correct usages are:\n\`${this.options.usage}\``)
                .setTimestamp()
                .setFooter(message.author.tag, message.author.displayAvatarURL() || client.user.displayAvatarURL())
            );
        }
        const member = message.guild.member(target.id);
        if (member) {
            if (message.author.id !== message.guild.ownerID && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) {
                return message.channel.send(new Discord.MessageEmbed()
                    .setColor('RED')
                    .setTimestamp()
                    .setFooter(message.author.tag, message.author.displayAvatarURL() || client.user.displayAvatarURL())
                    .setDescription('You can\'t unmute a member who has a higher or equal to your highest role.')
                );
            }
        } else {
            return message.channel.send(new Discord.MessageEmbed()
                .setColor('RED')
                .setDescription(`You can't unmute a user that is not on this server. ;-;`)
                .setTimestamp()
                .setFooter(message.author.tag, message.author.displayAvatarURL() || client.user.displayAvatarURL())
            );
        }
        const MODERATION = await message.guild.db.moderation(true);
        let role = message.guild.roles.cache.find((r) => { return r.name === 'Muted' }) || message.guild.roles.cache.get(await MODERATION.mutedRole);
        if (!role) {
            role = await message.guild.roles.create({
                name: 'Muted'
            });
            MODERATION.mutedRole = role.id;
            await MODERATION.save();
        }
        try {
            member.roles.remove(role, reason.join(' '));
            message.channel.send(`Successfuly unmuted ${target}`);
        } catch (e) {
            message.channel.send(`Error occured on unmuting ${target}`);
        }
    },
    config: {
        name: 'unmute',
        description: 'Unmute a muted member from the server!',
        permission: 'Server Moderator',
    },
    options: {
        aliases: [],
        clientPermissions: ['MANAGE_ROLES'],
        cooldown: 10,
        nsfwCommand: false,
        args: true,
        usage: 'unmute [UserMention|UserID]',
        donatorOnly: false,
        premiumServer: false,
    }
}