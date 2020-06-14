
const Discord = require('discord.js');
const { Message }= require('discord.js');
const Client = require('../classes/Unicron');

module.exports = {
    /**
     * 
     * @param {Client} client Client
     * @param {Message} message Message
     */
    run: async function (client, message) {
        await message.author.db.levelup(client, message, 20);
        await message.author.db.inventory.remove(this.config.id);
        return message.channel.send(new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTimestamp()
            .setAuthor(message.author.tag, message.author.displayAvatarURL() || null)
            .setDescription('Hmmmmm this tasty apple!')
        );
    },
    config: {
        id: 'apple',
        displayname: '🍎 Apple',
        description: 'An apple fell from the tree!',
    },
    options: {
        buyable: true,
        sellable: true,
        usable: true,
        price: 15,
        cost: Math.floor(15 * 0.3),
    }
}