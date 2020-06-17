
const Discord = require('discord.js');
const { Message } = require('discord.js');
const Client = require('../../classes/Unicron');
const BaseCommand = require('../../classes/BaseCommand');

module.exports = class extends BaseCommand {
    constructor() {
        super({
            config: {
                name: 'profile',
                description: 'Check user Profile',
                permission: 'User',
            },
            options: {
                aliases: [],
                cooldown: 5,
                nsfwCommand: false,
                args: false,
                usage: 'profile [User]',
                donatorOnly: false,
            }
        });
    }
    /**
     * @returns {Promise<Message|Boolean>}
     * @param {Client} client 
     * @param {Message} message 
     * @param {Array<String>} args 
     */
    async run(client, message, args) {
        const target = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
        if (!target) target = message.author;
        if (target.bot) {
            return message.channel.send(new Discord.MessageEmbed()
                .setColor('RED')
                .setDescription('Error: Cannot show profile of a bot user.'));
        }
        const profile = await client.database.users.fetch(target.id);
        const badges = client.chunk(await profile.badges.fetch(), 8);
        const balance = await profile.coins.fetch();
        const inventory = await profile.inventory.fetch();
        const level = await profile.experience.getLevel();
        const progress = await profile.experience.getProgressBar();
        const req = await profile.experience.getRequiredExpToNextLevel();
        const inventoryCount = inventory.reduce((acc, cur) => {
            return acc += cur.amount;
        }, 0);
        let badgeText = '\u200b';
        for (var i = 0; i < badges.length; i++) {
            for (var j = 0; j < badges[i].length; j++) {
                badgeText += `${await client.getEmoji(badges[i][j])}  `;
            }
            badgeText += '\n';
        }
        return message.channel.send(new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTimestamp()
            .setAuthor(target.tag, target.displayAvatarURL() || null)
            .addField('**Progress**', `**${level}** [${progress}](${client.unicron.serverInviteURL}) **${level + 1}**\n**${req}** - remaining`, true)
            .addField('**Badges**', badgeText, true)
            .addField('\u200b', '\u200b', true)
            .addField('**Coins**', `**${balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}** 💰`, true)
            .addField('**Inventory**', `**${inventoryCount}** item(s)`, true)
        );
    }
}