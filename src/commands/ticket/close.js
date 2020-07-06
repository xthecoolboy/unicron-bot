
const Discord = require('discord.js');
const { Message } = require('discord.js');
const Client = require('../../classes/Unicron');
const BaseCommand = require('../../classes/BaseCommand');

module.exports = class extends BaseCommand {
    constructor() {
        super({
            config: {
                name: 'close',
                description: 'Close a ticket!',
                permission: 'User',
            },
            options: {
                aliases: [],
                clientPermissions: ['MANAGE_CHANNELS', 'VIEW_CHANNEL', 'MANAGE_ROLES'],
                cooldown: 10,
                nsfwCommand: false,
                args: false,
                usage: 'close [...Reason]',
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
        const stat = message.guild.db.ticket('enabled');
        const strat = message.guild.db.ticket('category');
        if (!stat || !strat) {
            return message.channel.send(new Discord.MessageEmbed()
                .setColor('RED')
                .setTimestamp()
                .setDescription('Ticket System is disabled or the Ticket Category cannot be found, contact server admins to enable/fix this')
            );
        }
        if (message.channel.parentID !== strat) {
            return message.channel.send(new Discord.MessageEmbed()
                .setColor('RED')
                .setTimestamp()
                .setDescription('Oi, you can\'t close this ticket cuz it\'s not a ticket ;p')
            );
        }
        const response = await client.awaitReply(message, 'Are you sure to close this ticket? yes/no', 15000, true);
        if (!response || response.content === 'no' || response.content !== 'yes') {
            return message.channel.send('i guess not.')
        }
        const modchannel = message.guild.channels.cache.get(await message.guild.db.moderation('modLogChannel'));
        if (modchannel) {
            modchannel.send(new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setTimestamp()
                .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                .setTitle(`Ticket closed`)
                .setDescription(`Ticket : \`${message.channel.name}\`\nReason : ${args.join(' ') || 'No reason provided'}`)
            );
        }
        await message.channel.delete('Ticket closed.');
    }
}