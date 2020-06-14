
const Discord = require('discord.js');
const { Message }= require('discord.js');
const Client = require('../classes/Unicron');

module.exports = {
    /**
     * 
     * @param {Client} client Client
     * @param {Message} message Message
     */
    run: async function (client, message, user) {
        await message.author.db.levelup(client, message, 20);
        await message.author.db.inventory.remove(this.config.id);
        return message.channel.send(new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTimestamp()
            .setAuthor(message.author.tag, message.author.displayAvatarURL() || null)
            .setDescription('Ay yes... PANCAKES')
        );
    },
    config: {
        id: 'pancake',
        displayname: '🥞 Pancakes',
        description: 'It\'s a cake made from a frying pan!',
    },
    options: {
        buyable: true,
        sellable: false,
        usable: true,
        price: 350,
        cost: Math.floor(350 * 0.3),
    }
}