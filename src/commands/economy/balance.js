
const Discord = require('discord.js');

const User = require('../../handlers/User');
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
        const target = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
        if (!target) target = message.author;
        if (target.bot) {
            return message.channel.send(new Discord.MessageEmbed()
                .setColor('RED')
                .setDescription('Error: Cannot show balance of a bot user.'));
        }
        const user = new User(target.id);
        const coins = await user.coins.fetch();
        return message.channel.send(new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setAuthor(target.tag, target.displayAvatarURL())
            .setTimestamp()
            .setDescription(`**${coins.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}** 💸`)
        );
    },
    config: {
        name: 'balance',
        description: 'Shows User Balance',
        permission: 'User',
    },
    options: {
        aliases: ['bal'],
        cooldown: 3,
        nsfwCommand: false,
        args: false,
        usage: 'balance [UserMention|UserID]',
        donatorOnly: false,
    }
}