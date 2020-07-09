
const { Message, MessageEmbed } = require('discord.js');
const Client = require('../../classes/Unicron');
const BaseCommand = require('../../classes/BaseCommand');
const { evaluate } = require('mathjs');

module.exports = class extends BaseCommand {
    constructor() {
        super({
            config: {
                name: 'calc',
                description: 'Calculate a math expression',
                permission: 'User',
            },
            options: {
                aliases: [],
                clientPermissions: [],
                cooldown: 3,
                nsfwCommand: false,
                args: true,
                usage: 'calc <Math Expression>',
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
        let result;
        let embed = new MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setTitle('Calculator 101')
            .addField(`Expression`, `\`\`\`m\n${client.shorten(args.join(' '))}\n\`\`\``, 1000)
            ;
        try {
            result = evaluate(args.join(' '));
            if (isNaN(parseFloat(result))) {
                throw 1;
            }
            embed.setColor(0x00FF00)
                .addField(`Output`, `\`\`\`m\n${client.shorten(result, 1000)}\n\`\`\``);
        } catch (error) {
            embed.setColor('RED')
                .addField(`Output`, `\`\`\`xl\nError while evaluating the math expression.\n\`\`\``);
        }
        message.channel.send(embed);
    }
}