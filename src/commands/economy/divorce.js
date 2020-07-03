
const Discord = require('discord.js');
const { Message } = require('discord.js');
const Client = require('../../classes/Unicron');
const BaseCommand = require('../../classes/BaseCommand');

module.exports = class extends BaseCommand {
    constructor() {
        super({
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
        });
    }
    /**
     * @returns {Promise<Message|Boolean>}
     * @param {Client} client 
     * @param {Message} message 
     * @param {Array<String>} args 
     */
    async run(client, message, args) {
        const id = message.author.db.profile('married_id');
        if (!id) {
            return message.channel.send(new Discord.MessageEmbed()
                .setColor('RED')
                .setTimestamp()
                .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || null)
                .setDescription(`You can't file a divorce when you are not married to someone ;p`)
            );
        }
        const waifu = await client.database.users.fetch(id);
        const m1 = waifu.profile(true);
        const m2 = message.author.db.profile(true);
        m1['married_id'] = '';
        m2['married_id'] = '';
        await m1.save();
        await m2.save();
        return message.channel.send(new Discord.MessageEmbed()
            .setColor(0x00FFFF)
            .setTimestamp()
            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || null)
            .setDescription(`${message.author} and <@${waifu.id}> has gotten a divorce :<`)
        );
    }
}