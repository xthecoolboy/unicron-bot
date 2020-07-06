
const Discord = require('discord.js');
const { UserProfile } = require('../../database/database');
const { Message } = require('discord.js');
const Client = require('../../classes/Unicron');
const BaseCommand = require('../../classes/BaseCommand');

module.exports = class extends BaseCommand {
    constructor() {
        super({
            config: {
                name: 'leaderboard',
                description: `Shows leaderboard`,
                permission: 'User',
            },
            options: {
                aliases: ['top'],
                cooldown: 3,
                nsfwCommand: false,
                args: false,
                usage: `leaderboard [Flags: -exp] [Page]`,
                donatorOnly: false,
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
        const Cache = await UserProfile.findAll();
        const UserCache = Cache.filter((item) => {
            return message.guild.members.cache.has(item.user_id);
        });
        const rich = message.flags.includes('exp') ? false : true;
        const type = rich ? 'balance' : 'experience';
        const icon = rich ? '💰' : '✨';
        const name = rich ? 'Richest Users' : 'Experienced Users';
        const tabl = rich ? 'Coins' : 'Experience';
        const RichCache = client.chunk(UserCache.sort((a, b) => b.balance - a.balance).filter((item) => client.users.cache.has(item.user_id) && item.balance), 8);
        const ExpCache = client.chunk(UserCache.sort((a, b) => b.experience - a.experience).filter((item) => client.users.cache.has(item.user_id) && item.experience), 8)
        let embed = new Discord.MessageEmbed().setColor('RANDOM').setTimestamp();
        const PAGE = Number(args[0]) ? Number(args[0]) : 1;
        const Chunks = rich ? RichCache : ExpCache;
        const pages = Chunks.length;
        if (PAGE && PAGE > 0 && PAGE <= pages) {
            const text = Chunks[PAGE - 1].map((item, pos) => {
                return `**${pos + 1}** ${client.users.cache.get(item.user_id).tag}`;
            }).join('\n');
            const cornip = Chunks[PAGE - 1].map((item) => {
                return `**${item[type]}**  ${icon}`;
            }).join('\n');
            embed.addField(`__**${name}**__`, text || '\u200b', true);
            embed.addField(`__**${tabl}**__`, cornip || '\u200b', true);
            embed.setFooter(`Page ${PAGE} of ${pages} | ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }) || null);
            return message.channel.send(embed);
        }
        const text = Chunks[PAGE - 1].map((item, pos) => {
            return `**${pos + 1}** ${client.users.cache.get(item.user_id).tag}`;
        }).join('\n');
        const cornip = Chunks[PAGE - 1].map((item) => {
            return `**${item[type]}**  ${icon}`;
        }).join('\n');
        embed.addField(`__**${name}**__`, text || '\u200b', true);
        embed.addField(`__**${tabl}**__`, cornip || '\u200b', true);
        embed.setFooter(`Page ${PAGE} of ${pages} | ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }) || null);
        return message.channel.send(embed);
    }
}