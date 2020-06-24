
const Discord = require('discord.js');
const { Message } = require('discord.js');
const Client = require('../../classes/Unicron');
const BaseCommand = require('../../classes/BaseCommand');

module.exports = class extends BaseCommand {
    constructor() {
        super({
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
                usage: 'use <Item>',
                donatorOnly: false,
                premiumServer: false,
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
        const item = await client.shopitems.get(args[0].toLowerCase());
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
                .setDescription('Sorry, you cannot use this item'));
            return false;
        }
        return await item.run(client, message).catch(client.logger.error);
    }
}