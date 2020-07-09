const Discord = require('discord.js');
const { Message } = require('discord.js');
const Client = require('../../classes/Unicron');
const { Admin } = require('../../database/database');
const BaseCommand = require('../../classes/BaseCommand');

function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}

module.exports = class extends BaseCommand {
    constructor() {
        super({
            config: {
                name: 'redeem',
                description: 'Redeem using a super secret code ^_^',
                permission: 'User',
            },
            options: {
                aliases: [],
                clientPermissions: [],
                cooldown: 10,
                nsfwCommand: false,
                args: true,
                usage: 'redeem [Code]',
                donatorOnly: false,
                premiumServer: false,
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
        const code = client.hash(args[0], 'sha256');
        const dbUser = await client.unicron.database('user', true);
        const dbGuilds = await client.unicron.database('guild', true);
        const users = dbUser.data;
        const guilds = dbGuilds.data;
        const isuser = users.includes(code);
        const isguild = guilds.includes(code);
        if (isuser) {
            if (await message.author.db.profile('premium')) {
                return message.channel.send(new Discord.MessageEmbed()
                    .setColor('RED')
                    .setTimestamp()
                    .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                    .setDescription('You can\'t redeem a VIP Code when you are already a VIP :P')
                );
            }
            const response = await client.awaitReply(message, 'This is a VIP Code, are you sure to redeem it? yes/no', 15000);
            if (!response || response !== 'yes') {
                return message.channel.send('i guess not.');
            }
            await message.author.db.badges.add('vip');
            const model = await message.author.db.profile(true);
            model.premium = true;
            await model.save();
            await Admin.update({ data: removeItemOnce(dbUser.data, code) }, { where: { table: 'user' } });
            return message.channel.send(new Discord.MessageEmbed()
                .setColor(0x00FF00)
                .setTimestamp()
                .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                .setDescription('You have redeemed your VIP code now you can access to all VIP User COMMANDS!')
            );

        } else if (isguild) {
            if (await message.guild.db.settings('premium')) {
                return message.channel.send(new Discord.MessageEmbed()
                    .setColor('RED')
                    .setTimestamp()
                    .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                    .setDescription('You can\'t redeem a VIP Server Code when this server is already a VIP Server :P')
                );
            }
            const response = await client.awaitReply(message, 'This is a VIP Server Code, are you sure to redeem it? yes/no', 15000);
            if (!response || response !== 'yes') {
                return message.channel.send('i guess not.');
            }
            const model = await message.author.db.profile(true);
            const gmodel = await message.guild.db.settings(true);
            if (!await message.author.db.badges.has('vip')) await message.author.db.badges.add('vip');
            gmodel.premium = true;
            model.premium = true;
            await model.save();
            await gmodel.save();
            await Admin.update({ data: removeItemOnce(dbGuilds.data, code) }, { where: { table: 'guild' } });
            return message.channel.send(new Discord.MessageEmbed()
                .setColor(0x00FF00)
                .setTimestamp()
                .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                .setDescription('You have redeemed your VIP Server code, now everyone in the server can access to all VIP Server COMMANDS!')
            );
        } else {
            return message.channel.send(new Discord.MessageEmbed()
                .setColor('RED')
                .setTimestamp()
                .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                .setDescription('Error: This code is invalid or already expired, please try another.')
            );
        }
    }
}