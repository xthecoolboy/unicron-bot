
const Discord = require('discord.js');

const { Message } = require('discord.js');
const Client = require('../../classes/Unicron');
const BaseCommand = require('../../classes/BaseCommand');

module.exports = class extends BaseCommand {
    constructor() {
        super({
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
                usage: 'balance [User]',
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
        const target = await client.resolveUser(args[0]) || message.author;
        if (target.bot) {
            return message.channel.send(new Discord.MessageEmbed()
                .setColor('RED')
                .setDescription('Error: Cannot show balance of a bot user.'));
        }
        const user = await client.database.users.fetch(target.id);
        const coins = user.coins.fetch();
        return message.channel.send(new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setAuthor(target.tag, target.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setDescription(`**${coins.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}** 💸`)
        );
    }
}