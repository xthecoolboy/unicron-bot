
const Discord = require('discord.js');
const { Message } = require('discord.js');
const Client = require('../../classes/Unicron');

module.exports = {
    /**
     * 
     * @param {Client} client Client
     * @param {Message} message Message
     * @param {Array<String>} args Arguments
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
        if (message.guild.channels.cache.find((ch) => { return new RegExp(`${message.author.id}`).test(ch.name) })) {
            return message.channel.send(new Discord.MessageEmbed()
                .setColor('RED')
                .setTimestamp()
                .setDescription('Oi, you can\'t create a new ticket when you already have an open ticket ;p')
            );
        }
        const channel = await message.guild.channels.create(`${message.author.id}`, {
            parent: strat,
            type: 'text',
            topic: `TicketID: ${message.author.id}\n\nSubject: ${args.join(' ')}`,
            permissionOverwrites: [
                {
                    id: message.guild.id,
                    deny: ['VIEW_CHANNEL'],
                },
                {
                    id: message.author.id,
                    allow: ['VIEW_CHANNEL'],
                },
                {
                    id: client.user.id,
                    allow: ['VIEW_CHANNEL', 'MANAGE_CHANNELS', 'MANAGE_MESSAGES'],
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
            .addField('Subject', `${args.join(' ')}`)
            .addField('Explain', "Describe your problem so it could be resolved faster!")
            .addField('Ticket by', message.author.tag)
            .setDescription(`Thank you for creating a ticket.\nThe support team will assist you soon!`)
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