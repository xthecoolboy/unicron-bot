
const Discord = require('discord.js');

module.exports = {
    run: async function(client, message) {
        await message.author.db.levelup(client, message, 40);
        await message.author.db.inventory.remove(this.config.id);
        return message.channel.send(new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTimestamp()
            .setAuthor(message.author.tag, message.author.displayAvatarURL() || null)
            .setDescription('Ah yes, this bread is so delicious')
        );
    },
    config: {
        id: 'bread',
        displayname: '🍞 Bread',
        description: 'Tasty Bread ma man',
    },
    options: {
        buyable: true,
        sellable: true,
        usable: true,
        price: 20,
        cost: Math.floor(20 * 0.3),
    }
}