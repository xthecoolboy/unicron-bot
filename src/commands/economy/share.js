
const Discord = require('discord.js');
const { Message } = require('discord.js');
const Client = require('../../classes/Unicron');
const BaseCommand = require('../../classes/BaseCommand');

module.exports = class extends BaseCommand {
    constructor() {
        super({
            config: {
                name: 'share',
                description: 'Share coins to a user!',
                permission: 'User',
            },
            options: {
                aliases: ['transfer', 'give', 'pay'],
                cooldown: 180,
                nsfwCommand: false,
                args: true,
                usage: 'share <Amount> <User>\nshare <User> <Amount>',
                donatorOnly: false,
            }
        });
    }
    /**
     * @returns {Promise<Message|boolean>}
     * @param {Client} client 
     * @param {Message} message 
     * @param {Array<string>} args 
     */
    async run(client, message, args) {
        const currentAmount = message.author.db.coins.fetch();
        const target = await client.resolveUser(args[0]) || await client.resolveUser(args[1]);
        let transferAmount = await client.resolveUser(args[0]) ? args[1] : args[0];
        if (isNaN(transferAmount)) {
            if (transferAmount === 'all') { transferAmount = currentAmount; }
            else if (transferAmount === 'half') { transferAmount = Math.floor(currentAmount / 2); }
            else if (transferAmount === 'quarter') { transferAmount = Math.floor(currentAmount * .25); }
            else {
                return message.channel.send(new Discord.MessageEmbed()
                    .setColor('RED')
                    .setTimestamp()
                    .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                    .setDescription(`Sorry, that's an invalid amount`)
                );
            }
        }
        if (target.bot) {
            return message.channel.send(new Discord.MessageEmbed()
                .setColor('RED')
                .setTimestamp()
                .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription('Error: Cannot send coins to this user')
            );
        }
        if (!target) {
            return message.channel.send(new Discord.MessageEmbed()
                .setColor('RED')
                .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                .setDescription(`Sorry, that's an invalid user`)
            );
        }
        if (target.id === message.author.id) {
            return message.channel.send(new Discord.MessageEmbed()
                .setColor('RED')
                .setTimestamp()
                .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`Sorry, You cannot send coins to yourself, lmao`)
            );
        }
        if (transferAmount > currentAmount) {
            return message.channel.send(new Discord.MessageEmbed()
                .setColor('RED')
                .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                .setDescription(`Sorry, you don\'t have enough balance to send that amount of coins`)
            );
        }
        if (transferAmount < 100) {
            return message.channel.send(new Discord.MessageEmbed()
                .setColor('RED')
                .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                .setDescription('Error: Please enter an amount greater than **100**')
            );
        }
        const transferTarget = await client.database.users.fetch(target.id);
        await message.author.db.coins.remove(transferAmount);
        await transferTarget.coins.add(transferAmount);
        message.channel.send(new Discord.MessageEmbed()
            .setColor(0x00FF00)
            .setAuthor(`Transaction ID: ${client.utils.Random.string(6)}`)
            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setDescription(`Successfully transferred **${transferAmount}**💰 to ${target}.\nYour balance is now **${await message.author.db.coins.fetch()}**💰`)
        );
    }
}