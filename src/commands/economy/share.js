
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
                usage: 'share <Amount> <UserMention|UserID|UserTag>',
                donatorOnly: false,
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
        return message.channel.send(
            new Discord.MessageEmbed()
                .setColor('RED')
                .setDescription(`Sorry, this command is disabled due to a nitro giveaway event at [Unicron's Support Server](${client.unicron.serverInviteURL})`)
        );
        const currentAmount = await message.author.db.coins.fetch();
        let transferAmount = args[0];
        if (isNaN(transferAmount)) {
            if (transferAmount === 'all') { transferAmount = currentAmount; }
            else if (transferAmount === 'half') { transferAmount = Math.floor(currentAmount / 2); }
            else if (transferAmount === 'quarter') { transferAmount = Math.floor(currentAmount * .25); }
            else {
                return message.channel.send(new Discord.MessageEmbed()
                    .setColor('RED')
                    .setTimestamp()
                    .setFooter(message.author.tag, message.author.displayAvatarURL())
                    .setDescription(`Sorry, that's an invalid amount.`)
                );
            }
        }
        const target = message.mentions.users.first() || client.users.cache.get(args[1]) || client.users.cache.find((u) => u.tag === args[1]);
        if (target.bot) {
            return message.channel.send(new Discord.MessageEmbed()
                .setColor('RED')
                .setTimestamp()
                .setFooter(message.author.tag, message.author.displayAvatarURL())
                .setDescription('Error: Cannot send coins to this user.')
            );
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
        const transferTarget = await client.database.users.fetch(target.id)
        await message.author.db.coins.remove(transferAmount);
        await transferTarget.coins.add(transferAmount);
        message.channel.send(new Discord.MessageEmbed()
            .setColor(0x00FF00)
            .setFooter(message.author.tag, message.author.displayAvatarURL())
            .setTimestamp()
            .setDescription(`Successfully transferred **${transferAmount}**💰 to ${target}.\nYour balance is now **${await message.author.db.coins.fetch()}**💰`)
        );
    }
}