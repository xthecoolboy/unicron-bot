const Discord = require('discord.js');
const { Message } = require('discord.js');
const Client = require('../../classes/Unicron');
const BaseCommand = require('../../classes/BaseCommand');

module.exports = class extends BaseCommand {
    constructor() {
        super({
            config: {
                name: 'shop',
                description: 'Shows buyable items from the shop!',
                permission: 'User',
            },
            options: {
                aliases: ['market', 'store'],
                clientPermissions: [],
                cooldown: 3,
                nsfwCommand: false,
                args: false,
                usage: 'shop view <Item>\nshop [Page]',
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
        const [action, key] = args;
        if (action === 'view') {
            if (!key) {
                return message.channel.send(new Discord.MessageEmbed()
                    .setColor(`RED`)
                    .setDescription(`You didn\'t provide any arguments at \`[item]\`
                                Usage: \`${await message.guild.db.settings('prefix')}shop view <Item ID>\`
                                Example: \`${await message.guild.db.settings('prefix')}shop view bread\``));
            }
            const item = client.shopitems.get(key.toLowerCase());
            if (!item) {
                return message.channel.send(new Discord.MessageEmbed()
                    .setColor(`RED`)
                    .setDescription(`Sorry, That item does not exist.`));
            };
            return message.channel.send(new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`${item.config.displayname}`)
                .setDescription(`**Price** : **${item.options.price}**\n**Description** : ${item.config.description}\n**ID** : \`${item.config.id}\``));
        }
        let embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle('**Shop**')
            .setDescription(`You can also do \`${await message.guild.db.settings('prefix')}shop view [item]\` to get an information from a specific item.\nYou currently have **${await message.author.db.coins.fetch()}** 💰`);
        const ITEMS = client.chunk(client.shopitems.sort((a, b) => b.options.price - a.options.price).filter((item) => item.options.buyable), 4);
        const pages = ITEMS.length;
        if (!pages) {
            return message.channel.send(new Discord.MessageEmbed()
                .setColor('RED')
                .setDescription('The Shop is temporarily closed for today.'));
        }
        const PAGE = Number(action);
        if (!PAGE) {
            // ¯\_(ツ)_/¯
        } else if (PAGE > 0 && PAGE <= pages) {
            ITEMS[PAGE - 1].map(item => {
                embed.addField(`${item.config.displayname} ─ __**${item.options.price}**__ Coins`, `• ${item.config.description}\nID : \`${item.config.id}\``, false);
            });
            embed.setFooter(`Page ${PAGE} of ${pages} | ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }) || null);
            return message.channel.send(embed);
        }
        ITEMS[0].map(item => {
            embed.addField(`${item.config.displayname} ─ __**${item.options.price}**__ Coins`, `• ${item.config.description}\nID : \`${item.config.id}\``, false);
        });
        embed.setFooter(`Page 1 of ${pages} | ${message.author.tag} | buy [ItemID]`, message.author.displayAvatarURL({ dynamic: true }) || null);
        return message.channel.send(embed);
    }
}