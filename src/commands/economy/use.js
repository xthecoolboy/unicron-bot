
const Discord = require('discord.js');
const { Message }= require('discord.js');
const Client = require('../../classes/Unicron');

module.exports = {
    /**
     * 
     * @param {Client} client Client
     * @param {Message} message Message
     * @param {Array<String>} args Arguments
     */
    run: async function (client, message, args) {
        const item = await client.shopitems.get(args[0]);
        if (!item) {
            message.channel.send(new Discord.MessageEmbed()
                .setColor('RED')
                .setDescription('That\'s an invalid item.'));
            return false;
        }
        if (!await message.author.db.inventory.has(item.config.id)) {
            message.channel.send(new Discord.MessageEmbed()
                .setColor('RED')
                .setDescription(`Sorry, but you don\'t have a ${item.config.displayname}.`));
            return false;
        }
        if (!item.options.usable) {
            message.channel.send(new Discord.MessageEmbed()
                .setColor('RED')
                .setDescription('Sorry, this item is cannot be use.'));
            return false;
        }
        return await item.run(client, message).catch(console.log);
    },
    config: {
        name: 'use',
        description: 'Use an item from your inventory!',
        permission: 'User',
    },
    options: {
        aliases: [],
        clientPermissions: [],
        cooldown: 60,
        nsfwCommand: false,
        args: true,
        usage: 'use [Item]',
        donatorOnly: false,
        premiumServer: false,
    }
}