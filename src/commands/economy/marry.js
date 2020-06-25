const Discord = require('discord.js');
const { Message } = require('discord.js');
const Client = require('../../classes/Unicron');
const BaseCommand = require('../../classes/BaseCommand');

module.exports = class extends BaseCommand {
    constructor() {
        super({
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
                usage: 'marry <UserMention>',
                donatorOnly: false,
                premiumServer: false,
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
        const target = message.mentions.users.first();
        if (!target) {
            return message.channel.send(new Discord.MessageEmbed()
                .setColor('RED')
                .setTimestamp()
                .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription('Error: You gotta mention who to marry -_-')
            );
        }
        if (target.bot) {
            return message.channel.send(new Discord.MessageEmbed()
                .setColor('RED')
                .setTimestamp()
                .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription('Error: You can\'t marry a bot user </3')
            );
        }
        if (message.author.equals(target)) {
            return message.channel.send(new Discord.MessageEmbed()
                .setColor('RED')
                .setTimestamp()
                .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription('Error: You can\'t marry yourself :<')
            );
        }
        const ttarget = await client.database.users.fetch(target.id);
        const tID = await ttarget.profile('married_id');
        const mID = await message.author.db.profile('married_id');
        if (tID === message.author.id) {
            return message.channel.send(new Discord.MessageEmbed()
                .setColor(0x00FF00)
                .setTimestamp()
                .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription('Woah, you two are already married.. <3')
            );
        }
        if (tID) {
            return message.channel.send(new Discord.MessageEmbed()
                .setColor('RED')
                .setTimestamp()
                .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription('Woah, that person is already married to someone else -,-')
            );
        }
        if (mID) {
            return message.channel.send(new Discord.MessageEmbed()
                .setColor('RED')
                .setTimestamp()
                .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
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
                await m1.save();
                await m2.save();
                return message.channel.send(`🎉 ${message.author} and ${target} has been married yay!. 🎉`);
            }).catch((e) => {
                console.log(e);
                message.channel.send('Looks like nobody is getting married today.');
            });
    }
}