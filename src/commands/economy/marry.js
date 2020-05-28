
const Discord = require('discord.js');

const User = require('../../handlers/User');

module.exports = {
    /**
     * 
     * @param {Discord.Client} client Client
     * @param {Discord.Message} message Message
     * @param {Array} args Arguments
     */
    run: async function (client, message) {
        const target = message.mentions.users.first();
        if (!target) {
            return message.channel.send(new Discord.MessageEmbed()
                .setColor('RED')
                .setTimestamp()
                .setFooter(message.author.tag, message.author.displayAvatarURL())
                .setDescription('Error: You gotta mention who to marry -_-')
            );
        }
        if (target.bot) {
            return message.channel.send(new Discord.MessageEmbed()
                .setColor('RED')
                .setTimestamp()
                .setFooter(message.author.tag, message.author.displayAvatarURL())
                .setDescription('Error: You can\'t marry a bot user </3')
            );
        }
        if (message.author.equals(target)) {
            return message.channel.send(new Discord.MessageEmbed()
                .setColor('RED')
                .setTimestamp()
                .setFooter(message.author.tag, message.author.displayAvatarURL())
                .setDescription('Error: You can\'t marry yourself :<')
            );
        }
        const ttarget = new User(target.id);
        const tID = await ttarget.profile('married_id');
        const mID = await message.author.db.profile('married_id');
        if ( tID === message.author.id) {
            return message.channel.send(new Discord.MessageEmbed()
                .setColor(0x00FF00)
                .setTimestamp()
                .setFooter(message.author.tag, message.author.displayAvatarURL())
                .setDescription('Woah, you two are already married.. <3')
            );
        }
        if (tID) {
            return message.channel.send(new Discord.MessageEmbed()
                .setColor('RED')
                .setTimestamp()
                .setFooter(message.author.tag, message.author.displayAvatarURL())
                .setDescription('Woah, that person is already married to someone else -,-')
            );
        }
        if (mID) {
            return message.channel.send(new Discord.MessageEmbed()
                .setColor('RED')
                .setTimestamp()
                .setFooter(message.author.tag, message.author.displayAvatarURL())
                .setDescription('Woah, you are already married to someone else -.-')
            );
        }
        const filter = function (response) {
            return response.author.id === target.id && ['yes'].includes(response.content.toLowerCase());
        };
        message.channel.send(`Hey ${target} will you accept ${message.author} as your beloved husband/wife? yes or no`);
        message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
            .then(async (collected) => {
                const m1 = await message.author.db.profile(true);
                const m2 = await ttarget.profile(true);
                m1.married_id = target.id;
                m2.married_id = message.author.id;
                m1.save();
                m2.save();
                return message.channel.send(`🎉 ${message.author} and ${target} has been married yay!. 🎉`);
            }).catch((e) => {
                console.log(e);
                message.channel.send('Looks like nobody is getting married this time.');
            });
    },
    config: {
        name: 'marry',
        description: 'Marry someone using this command. O.o <3',
        permission: 'User',
    },
    options: {
        aliases: ['merry'],
        cooldown: 1200,
        nsfwCommand: false,
        args: true,
        usage: 'marry [UserMention]',
        donatorOnly: false,
        premiumServer: false,
    }
}