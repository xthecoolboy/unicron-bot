
const Discord = require('discord.js');
const { Message } = require('discord.js');
const Client = require('../../classes/Unicron');
const BaseCommand = require('../../classes//BaseCommand');

module.exports = class extends BaseCommand {
    constructor() {
        super({
            config: {
                name: 'softban',
                description: 'Bans someone from the server then immediately unban!',
                permission: 'Server Moderator',
            },
            options: {
                aliases: [],
                clientPermissions: ['BAN_MEMBERS'],
                cooldown: 10,
                nsfwCommand: false,
                args: true,
                usage: 'softban <User> [...Reason]',
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
        const target = await client.resolveUser(user);
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
                .setDescription(`Hey there, You can\'t softban yourself :P`)
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
                    .setDescription('You can\'t softban a member who has a higher or equal to your highest role.')
                );
            }
            if (!member.bannable) {
                return message.channel.send(new Discord.MessageEmbed()
                    .setColor('RED')
                    .setDescription('Error: I can\'t softban that member.')
                    .setTimestamp()
                    .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                );
            }
        } else {
            return message.channel.send(new Discord.MessageEmbed()
                .setColor('RED')
                .setDescription(`You can't softban a user that is not on this server. ;-;`)
                .setTimestamp()
                .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
            );
        }
        const _reason = reason ? reason.join(' ') : 'No reason provided.';
        const dm = await target.createDM();
        await dm.send(new Discord.MessageEmbed()
            .setTimestamp()
            .setTitle(`You have been soft banned from ${message.guild.name} / ${message.guild.id}`)
            .setDescription(`Reason : ${_reason}`)
            .setFooter(`Moderator : ${message.author.tag} / ${message.author.id}`, message.author.displayAvatarURL({ dynamic: true }) || message.guild.iconURL())
        );
        try {
            await message.guild.members.ban(member.user.id, { reason: _reason, }).catch((e) => { throw e });
            setTimeout(() => {
                message.guild.members.unban(target.id).catch(() => { });
            }, 10000);
        } catch (e) {
            return message.channel.send(new Discord.MessageEmbed()
                .setColor('RED')
                .setDescription(`Unexpected error occured. Member was not soft banned`)
                .setTimestamp()
                .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
            );
        }
        message.channel.send(`Successfully soft banned ${target.tag}`);
        const modchannel = await client.channels.fetch(message.guild.db.moderation('modLogChannel')).catch(() => { });
        if (modchannel && modchannel.type === 'text') {
            modchannel.send(new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setAuthor(`${message.author.tag} / ${message.author.id}`, message.author.displayAvatarURL({ dynamic: true }) || message.guild.iconURL())
                .setTimestamp()
                .setThumbnail(target.displayAvatarURL({ dynamic: true }) || null)
                .setDescription(`**Member** : ${target.tag} / ${target.id}\n**Action** : SoftBan\n**Reason** : ${_reason}`)
            );
        }
    }
}