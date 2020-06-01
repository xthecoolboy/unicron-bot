
const Discord = require('discord.js');

module.exports = {
    /**
     * 
     * @param {Discord.Client} client Client
     * @param {Discord.Message} message Message
     * @param {Array} args Arguments
     */
    run: async function (client, message, args) {
        const item = await client.shopitems.get(args[0].toLowerCase());
        if (!item) {
            return message.channel.send(new Discord.MessageEmbed()
                .setColor('RED')
                .setDescription(`An item with an ID of \`${args[0]}\` doesn\'t exists`));
        }
        if (!item.options.sellable) {
            return message.channel.send(new Discord.MessageEmbed()
                .setColor('RED')
                .setDescription(`You cannot sell this item.`));
        }
        if (!message.author.db.inventory.has(item.config.id)) {
            return message.channel.send(new Discord.MessageEmbed()
                .setColor('RED')
                .setDescription(`You don\'t have that item to sell.`));
        }
        await message.author.db.coins.remove(item.options.cost);
        await message.author.db.inventory.remove(item.config.id);
        return message.channel.send(new Discord.MessageEmbed()
            .setColor('0x00FF00')
            .setDescription(`You've sold **${item.config.displayname}**, for the price of **${item.options.cost}** Coins`)
        );
    },
    config: {
        name: 'sell',
        description: 'Sells an item from your inventory!',
        permission: 'User',
    },
    options: {
        aliases: [],
        clientPermissions: [],
        cooldown: 3,
        nsfwCommand: false,
        args: true,
        usage: 'sell [Item ID]',
        donatorOnly: false,
        premiumServer: false,
    }
}