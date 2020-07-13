
const Discord = require('discord.js');
const ms = require('ms');
const { Message, GuildChannel } = require('discord.js');
const Client = require('../../classes/Unicron');
const BaseCommand = require('../../classes/BaseCommand');

module.exports = class extends BaseCommand {
    constructor() {
        super({
            config: {
                name: 'mute',
                description: 'Mute a member from the server!',
                permission: 'Server Moderator',
            },
            options: {
                aliases: [],
                clientPermissions: ['MANAGE_ROLES', 'MANAGE_CHANNELS'],
                cooldown: 10,
                nsfwCommand: false,
                args: true,
                usage: 'mute <User> [...Reason]\nmute <User> [Duration] [...Reason]',
                donatorOnly: false,
                premiumServer: false,
            }
        });
    }
    /**
     * @returns {Promise<Message|boolean>}
     * @param {Client} client 
     * @param {Message} message 
     * @param {Array<string>} args 
     */
    async run(client, message, args) {
        const [user, ...reason] = args;
        let target = message.mentions.users.first() || client.users.cache.get(user);
        if (!target) {
            return message.channel.send(new Discord.MessageEmbed()
                .setColor('RED')
                .setDescription(`Incorrect Usage, the correct usages are:\n\`${this.options.usage}\``)
                .setTimestamp()
                .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
            );
        }
        if (target.equals(message.author)) {
            return message.channel.send(new Discord.MessageEmbed()
                .setColor('RED')
                .setDescription(`Hey there, You mute mute yourself :P`)
                .setTimestamp()
                .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
            );
        }
        const member = message.guild.member(target.id);
        if (member) {
            if (message.author.id !== message.guild.ownerID && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) {
                return message.channel.send(new Discord.MessageEmbed()
                    .setColor('RED')
                    .setTimestamp()
                    .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                    .setDescription('You can\'t mute a member who has a higher or equal to your highest role.')
                );
            }
        } else {
            return message.channel.send(new Discord.MessageEmbed()
                .setColor('RED')
                .setDescription(`You can't mute a user that is not on this server. ;-;`)
                .setTimestamp()
                .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
            );
        }
        const duration = reason[0] ? ms(reason[0]) : false;
        if (duration) reason.shift();
        const _reason = reason ? reason.join(' ') : 'No reason provided.';
        let role = message.guild.roles.cache.find((r) => { return r.name === 'Muted' });
        if (!role) role = await message.guild.roles.create({ name: 'Muted' }, 'Mute');
        await member.roles.add(role, _reason).catch(() => {
            message.channel.send('Member was not muted.');
        });
        for (let schannel of message.guild.channels.cache.filter(channel => channel.type === 'text')) {
            const channel = schannel[1];
            if (!channel.permissionOverwrites.get(role.id)) {
                await channel.createOverwrite(role, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                }).catch(() => { });
            }
        }
        if (duration && !isNaN(duration)) {
            setTimeout(() => {
                member.roles.remove(role, 'Mute Duration expired').catch(() => { });
            }, Number(duration));
        }
        message.channel.send(`Successfully muted ${target}`);
        const modchannel = await client.channels.fetch(message.guild.db.moderation('modLogChannel')).catch(() => { });
        if (modchannel && modchannel.type === 'text') {
            modchannel.send(new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setAuthor(`${message.author.tag} / ${message.author.id}`, message.author.displayAvatarURL({ dynamic: true }) || message.guild.iconURL())
                .setTimestamp()
                .setThumbnail(target.displayAvatarURL({ dynamic: true }) || null)
                .setDescription(`**Member** : ${target.tag} / ${target.id}\n**Action** : Mute\n**Reason** : ${_reason}\n${duration ? `**Length** : ${ms(duration)}` : ''}`)
            );
        }
        try {
            const dm = await target.createDM();
            await dm.send(new Discord.MessageEmbed()
                .setTimestamp()
                .setTitle(`You have been muted from ${message.guild.name}`)
                .setDescription(`Reason : ${_reason}`)
                .setFooter(`Moderator : ${message.author.tag} / ${message.author.id}`, message.author.displayAvatarURL({ dynamic: true }) || message.guild.iconURL())
            ).catch(() => { });
        } catch (e) {
            //
        }
    }
}