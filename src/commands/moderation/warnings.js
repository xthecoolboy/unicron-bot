
const Discord = require('discord.js');
const Member = require('../../classes/GuildMember');
const { Message } = require('discord.js');
const Client = require('../../classes/Unicron');
const BaseCommand = require('../../classes/BaseCommand');

module.exports = class extends BaseCommand {
    constructor() {
        super({
            config: {
                name: 'warnings',
                description: 'View warnings of a server member!',
                permission: 'User',
            },
            options: {
                aliases: ['warns'],
                clientPermissions: [],
                cooldown: 10,
                nsfwCommand: false,
                args: false,
                usage: 'warnings <User> [Page]\nwarnings [Page]',
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
        const [user, page] = args;
        const target = await client.resolveUser(user) || message.author;
        if (!target || target.bot) target = message.author;
        let embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setAuthor(`${target.tag} / ${target.id}`, target.displayAvatarURL({ dynamic: true }) || null)
            .setTimestamp();
        const mem = new Member(target.id, message.guild.id);
        const warns = client.chunk(await mem.warnings.fetchAll(), 3);
        if (!warns || !warns.length) {
            embed.setDescription('No warnings here, clean slate');
            return message.channel.send(embed);
        }
        const num_of_pages = warns.length;
        const PAGE = Number(user) || Number(page);
        if (!PAGE) {

        } else if (PAGE > 0 && PAGE <= num_of_pages) {
            warns[PAGE - 1].map(item => {
                embed.addField(`**Case ${item.case}**`, `**Reason** : ${item.reason}\n**Moderator** : ${item.issued_by}\n**Date** : ${item.when}`);
            });
            embed.setFooter(`Page ${PAGE} of ${num_of_pages}`);
            return message.channel.send(embed);
        }
        warns[0].map(item => {
            embed.addField(`**Case ${item.case}**`, `**Reason** : ${item.reason}\n**Moderator** : ${item.issued_by}\n**Date** : ${item.when}`);
        });
        embed.setFooter(`Page 1 of ${num_of_pages}`);
        return message.channel.send(embed);
    }
}