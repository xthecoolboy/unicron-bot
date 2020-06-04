
const Discord = require('discord.js');
const Member = require('../../handlers/Member');

module.exports = {
    /**
     * 
     * @param {Discord.Client} client Client
     * @param {Discord.Message} message Message
     * @param {Array} args Arguments
     */
    run: async function (client, message, [user, page, ...values]) {
        let target;
        if (message.mentions.users.size) {
            target = message.mentions.users.first();
        } else if (user) {
            target = await client.users.fetch(user);
        } else {
            target = message.author;
        }
        if (!target || target.bot) {
            target = message.author;
        }
        let embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setAuthor(`${target.tag} / ${target.id}`, target.displayAvatarURL() || null)
            .setTimestamp();
        const mem = new Member(target.id, message.guild.id);
        const warns = client.chunk(await mem.warnings.fetchAll(), 3);
        console.log(warns);
        if (!warns.length) {
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
    },
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
        usage: 'warnings [UserMention|UserID] [Page](Optional)\nwarnings [Page]',
        donatorOnly: false,
        premiumServer: false,
    }
}