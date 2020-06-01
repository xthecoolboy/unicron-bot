
const Discord = require('discord.js');

module.exports = {
    /**
     * 
     * @param {Discord.Client} client Client
     * @param {Discord.Message} message Message
     * @param {Array} args Arguments
     */
    run: async function (client, message, args) {
        const item = await client.shopitems.get(args[0]);
        if (!item) {
            message.channel.send(new Discord.MessageEmbed()
                .setColor('RED')
                .setDescription('That item doesn\'t'));
            return false;
        }
        if (!item.options.buyable) {
            message.channel.send(new Discord.MessageEmbed()
                .setColor('RED')
                .setDescription('This item is not for sale.'));
            return false;
        }
        if (item.options.price > await message.author.db.coins.fetch()) {
            message.channel.send(new Discord.MessageEmbed()
                .setColor('RED')
                .setDescription(`You need **${item.options.price - await message.author.db.coins.fetch()}** more coins to buy this item.`));
            return false;
        }
        await message.author.db.coins.remove(item.options.price);
        await message.author.db.inventory.add(item.config.id);

        message.channel.send(new Discord.MessageEmbed()
            .setColor(0x00FF00)
            .setDescription(`You've bought: **${item.config.displayname}** , for the price of **${item.options.price}** Coins`)
        );
    },
    config: {
        name: 'buy',
        description: 'Buys an item from the shop!',
        permission: 'User',
    },
    options: {
        aliases: [],
        clientPermissions: [],
        cooldown: 3,
        nsfwCommand: false,
        args: true,
        usage: 'buy [Item ID]',
        donatorOnly: false,
        premiumServer: false,
    }
}