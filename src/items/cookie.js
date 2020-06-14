
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
        await message.author.db.levelup(client, message, 120);
        await message.author.db.inventory.remove(this.config.id);
        return message.channel.send(new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTimestamp()
            .setAuthor(message.author.tag, message.author.displayAvatarURL() || null)
            .setDescription('Uh HUH! this cookieeeeeeeee!')
        );
    },
    config: {
        id: 'cookie',
        displayname: '🍪 Cookie',
        description: 'Special made cookie just for you!',
    },
    options: {
        buyable: true,
        sellable: false,
        usable: true,
        price: 250,
        cost: Math.floor(250 * 0.3),
    }
}