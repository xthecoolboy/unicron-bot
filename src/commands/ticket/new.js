
const Discord = require('discord.js');
const { Random } = require('../../utils/');

module.exports = {
    /**
     * 
     * @param {Discord.Client} client Client
     * @param {Discord.Message} message Message
     * @param {Array} args Arguments
     */
    run: async function (client, message, args) {
        const stat = await message.guild.db.ticket('enabled');
        const strat = await message.guild.db.ticket('category');
        if (!stat || !strat) {
            return message.channel.send(new Discord.MessageEmbed()
                .setColor('RED')
                .setTimestamp()
                .setDescription('Ticket System is disabled or the Ticket Category cannot be found, contact server admins to enable/fix this')
            );
        }
        if (message.channel.parentID === strat) {
            return message.channel.send(new Discord.MessageEmbed()
                .setColor('RED')
                .setTimestamp()
                .setDescription('Oi, you can\'t create a ticket inside a ticket ;p')
            );
        }
        const channel = await message.guild.channels.create(Random.string(6), {
            parent: strat,
            type: 'text',
            permissionOverwrites: [
                {
                    id: message.guild.id,
                    deny: ['VIEW_CHANNEL'],
                },
                {
                    id: message.author.id,
                    allow: ['VIEW_CHANNEL'],
                }
            ],
        });
        await message.channel.send(new Discord.MessageEmbed()
            .setColor(0x00FF00)
            .setDescription(`Your ticket has been created! <#${channel.id}>\nWe will contact you in the ticket shortly!`)
            .setTimestamp()
            .setAuthor('Unicron Ticket System')
        );
        if (message.guild.roles.cache.find(r => r.name.toLowerCase() === 'support team')) channel.overwritePermissions(message.guild.cache.roles.find(r => r.name.toLowerCase() === 'support team').id)
        if (await message.guild.db.moderation('moderatorRole')) channel.overwritePermissions(await message.guild.db.moderation('moderatorRole'));
        if (await message.guild.db.moderation('adminRole')) channel.overwritePermissions(await message.guild.db.moderation('adminRole'));
        channel.send(new Discord.MessageEmbed()
            .setColor('RANDOM')
            .addField('Subject', `${args.join(' ')}`).addField('Explain', "Explain in detail what you need for a faster response!").setDescription(`Thank you for creating a ticket.\nThe support team will assist you soon!`)
        );
    },
    config: {
        name: 'new',
        description: 'Creates a new ticket!',
        permission: 'User',
    },
    options: {
        aliases: [],
        clientPermissions: ['MANAGE_CHANNELS', 'VIEW_CHANNEL', 'MANAGE_ROLES'],
        cooldown: 10,
        nsfwCommand: false,
        args: true,
        usage: 'new [...Topic]',
        donatorOnly: false,
        premiumServer: false,
    }
}