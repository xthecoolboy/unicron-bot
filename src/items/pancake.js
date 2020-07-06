
const Discord = require('discord.js');
const { Message } = require('discord.js');
const Client = require('../classes/Unicron');
const BaseItem = require('../classes/BaseItem');

module.exports = class extends BaseItem {
    constructor() {
        super({
            config: {
                id: 'pancake',
                displayname: '🥞 Pancake',
                description: 'It\'s a cake made from a frying pan!',
            },
            options: {
                buyable: true,
                sellable: false,
                usable: true,
                price: 350,
                cost: Math.floor(350 * 0.3),
            }
        });
    }
    /**
     * @returns {Promise<boolean|Message>}
     * @param {Client} client 
     * @param {Message} message 
     */
    async run(client, message) {
        await message.author.db.levelup(client, message, 150);
        await message.author.db.inventory.remove(this.config.id);
        return message.channel.send(new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTimestamp()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || null)
            .setDescription('Ay yes... PANCAKES')
        );
    }
}