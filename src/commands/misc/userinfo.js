
const Discord = require('discord.js');
const { Message } = require('discord.js');
const Client = require('../../classes/Unicron');

module.exports = {
    /**
     * 
     * @param {Client} client Client
     * @param {Message} message Message
     * @param {Array<String>} args Arguments
     */
    run: async function (client, message, args) {
        let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
        if (!user) user = message.author;
        let member = message.guild.members.cache.get(user.id);
        let nick = member.nickname;
        if (!nick) nick = '-';
        let status = user.presence.status;
        switch (status) {
            case 'online': {
                status = `${await client.getEmoji('online')} Online`;
                break;
            }
            case 'idle': {
                status = `${await client.getEmoji('idle')} Idle`;
                break;
            }
            case 'dnd': {
                status = `${await client.getEmoji('dnd')} Do not Disturb`;
                break;
            }
            case 'offline': {
                status = `${await client.getEmoji('offline')} Offline`;
                break;
            }
        }
        let roles = member.roles.cache.map(r => `<@&${r.id}>`).slice(1).join(', ').replace(new RegExp(`<@&${message.guild.id}>`, 'g'), '');
        if (roles.length === 0) roles = '-';
        return message.channel.send(new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setThumbnail(user.displayAvatarURL())
            .addField(`${user.bot ? 'Bot' : 'User'} Info`, `${user.tag} / ${user.id}`)
            .addField(`Joined Server`, member.joinedAt.toUTCString(), true)
            .addField(`Created At`, user.createdAt.toUTCString(), true)
            .addField('\u200b', '\u200b',true)
            .addField(`Status`, status, true)
            .addField(`Nickname`, nick, true)
            .addField(`Roles`, roles)
            .setTimestamp()
        );
    },
    config: {
        name: 'userinfo',
        description: 'Shows information about a user!',
        permission: 'User',
    },
    options: {
        aliases: ['whois'],
        clientPermissions: [],
        cooldown: 10,
        nsfwCommand: false,
        args: false,
        usage: '',
        donatorOnly: false,
        premiumServer: false,
    }
}