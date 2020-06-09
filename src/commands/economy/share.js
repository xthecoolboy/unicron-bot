
const Discord = require('discord.js');
const User = require('../../handlers/User');

module.exports = {
    /**
     * 
     * @param {Discord.Client} client Client
     * @param {Discord.Message} message Message
     * @param {Array} args Arguments
     */
    run: async function (client, message, args) {
        const input = message.content.slice(await message.guild.db.settings('prefix').length).trim();
        const [, , commandArgs] = input.match(/(\w+)\s*([\s\S]*)/);
        const currentAmount = await message.author.db.coins.fetch();
        let transferAmount = commandArgs.split(/ +/).find(arg => !/<@!?\d+>/.test(arg));
        const target = message.mentions.users.first() || client.users.cache.get(args[1]) || client.users.cache.find((u) => u.tag === args[1] || args[0]);
        if (target.bot) {
            return message.channel.send(new Discord.MessageEmbed()
                .setColor('RED')
                .setTimestamp()
                .setFooter(message.author.tag, message.author.displayAvatarURL())
                .setDescription('Error: Cannot send coins to this user.')
            );
        }
        if (isNaN(transferAmount)) {
            if (transferAmount === 'all') { transferAmount = currentAmount; }
            else if (transferAmount === 'half') { transferAmount = Math.floor(currentAmount / 2); }
            else if (transferAmount === 'quarter') { transferAmount = Math.floor(currentAmount * .25); }
            else {
                return message.channel.send(new Discord.MessageEmbed()
                    .setColor('RED')
                    .setTimestamp()
                    .setFooter(message.author.tag, message.author.displayAvatarURL())
                    .setDescription(`Sorry, that's an invalid amount.`))
                    ;
            }
        }
        if (!target) {
            return message.channel.send(new Discord.MessageEmbed()
                .setColor('RED')
                .setFooter(message.author.tag, message.author.displayAvatarURL())
                .setTimestamp()
                .setDescription(`Sorry, that's an invalid user.\n\`share [UserMention|UserTag] [Amount]\``)
            );
        }
        if (target.id === message.author.id) {
            return message.channel.send(new Discord.MessageEmbed()
                .setColor('RED')
                .setTimestamp()
                .setFooter(message.author.tag, message.author.displayAvatarURL())
                .setDescription(`Sorry, You cannot send coins to yourself, lmao.`)
            );
        }
        if (transferAmount > currentAmount) {
            return message.channel.send(new Discord.MessageEmbed()
                .setColor('RED')
                .setFooter(message.author.tag, message.author.displayAvatarURL())
                .setTimestamp()
                .setDescription(`Sorry, you don\'t have enough balance to send that amount of coins.`)
            );
        }
        if (transferAmount < 100) {
            return message.channel.send(new Discord.MessageEmbed()
                .setColor('RED')
                .setFooter(message.author.tag, message.author.displayAvatarURL())
                .setTimestamp()
                .setDescription('Error: Please enter an amount greater than **100**')
            );
        }
        const transferTarget = new User(target.id);
        message.author.db.coins.remove(transferAmount);
        transferTarget.coins.add(transferAmount);
        message.channel.send(new Discord.MessageEmbed()
            .setColor('LIME')
            .setFooter(message.author.tag, message.author.displayAvatarURL())
            .setTimestamp()
            .setDescription(`Successfully transferred **${transferAmount}**💰 to ${target}.\nYour balance is now **${await message.author.db.coins.fetch()}**💰`)  
        );
    },
    config: {
        name: 'share',
        description: 'Share coins to a user!',
        permission: 'User',
    },
    options: {
        aliases: ['transfer', 'give'],
        cooldown: 180,
        nsfwCommand: false,
        args: true,
        usage: 'share [UserMention|UserTag] [Amount]',
        donatorOnly: false,
    }
}