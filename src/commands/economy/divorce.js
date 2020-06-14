
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
        if (!await message.author.db.profile('married_id')) {
            return message.channel.send(new Discord.MessageEmbed()
                .setColor('RED')
                .setTimestamp()
                .setFooter(message.author.tag, message.author.displayAvatarURL() || client.user.displayAvatarURL())
                .setDescription(`You can't file a divorce when you are not married to someone ;p`)
            );
        }
        const waifu = new User(await message.author.db.profile('married_id'));
        const m1 = await waifu.profile(true);
        const m2 = await message.author.db.profile(true);
        m1['married_id'] = '';
        m2['married_id'] = '';
        await m1.save();
        await m2.save();
        return message.channel.send(new Discord.MessageEmbed()
            .setColor(0x00FFFF)
            .setTimestamp()
            .setFooter(message.author.tag, message.author.displayAvatarURL() || client.user.displayAvatarURL())
            .setDescription(`${message.author} and <@${waifu.id}> has gotten a divorce :<`)
        );
    },
    config: {
        name: 'divorce',
        description: 'File a divorce to your husband/wife',
        permission: 'User',
    },
    options: {
        aliases: ['breakup'],
        cooldown: 1200,
        nsfwCommand: false,
        args: false,
        usage: 'divorce',
        donatorOnly: false,
        premiumServer: false,
    }
}