
const Discord = require('discord.js');
const BaseCommand = require('../../classes/BaseCommand');
const Client = require('../../classes/Unicron');

module.exports = class extends BaseCommand {
    constructor() {
        super({
            config: {
                name: 'inventory',
                description: 'Shows user\'s inventory!',
                permission: 'User',
            },
            options: {
                aliases: ['inv'],
                clientPermissions: [],
                cooldown: 8,
                nsfwCommand: false,
                args: false,
                usage: 'inventory [User] [Page]\ninventory [Page]\binventory page <Page>',
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
        const [action, paging] = args;
        const target = await client.resolveUser(action) || message.author;
        const userp = await client.database.users.fetch(target.id);
        const items = await userp.inventory.fetch();
        if (!items.length) {
            message.channel.send(new Discord.MessageEmbed()
                .setColor('RED')
                .setTitle(`**${target.tag}'s** Inventory`)
                .setDescription(`**NOTHING**`));
            return false;
        }
        let embed = new Discord.MessageEmbed()
            .setColor('RANDOM').setDescription(`**${target.tag}\'s** Inventory`);
        const _items = client.chunk(items.sort((a, b) => b.amount - a.amount), 4);
        const pages = _items.length;
        const page = Number(paging) || Number(action);
        if (!page) {
            //
        } else if (page > 0 && page <= pages) {
            _items[page - 1].map(m => {
                const p = client.shopitems.get(m.item_id);
                embed.addField(` **${m.amount} ~ ${p.config.displayname}**`, `• ${p.config.description}\n Cost : **${p.options.cost}** coins`);
            });
            embed.setFooter(`Page ${page} of ${pages} | ${message.author.tag}`, message.author.displayAvatarURL);
            return message.channel.send(embed);
        }
        _items[0].map(m => {
            const p = client.shopitems.get(m.item_id);
            embed.addField(` **${m.amount} ~ ${p.config.displayname}**`, `• ${p.config.description}\n Cost : **${p.options.cost}** coins`);
        });
        embed.setFooter(`Page 1 of ${pages} | ${message.author.tag}`, message.author.displayAvatarURL);
        return message.channel.send(embed);
    }
}