const { Message, MessageEmbed } = require('discord.js');
const Client = require('../../classes/Unicron');
const BaseCommand = require('../../classes/BaseCommand');

module.exports = class extends BaseCommand {
    constructor() {
        super({
            config: {
                name: 'dtinvite',
                description: 'Invite a user to your private text channel!',
                permission: 'User',
            },
            options: {
                aliases: [],
                clientPermissions: [],
                cooldown: 3,
                nsfwCommand: false,
                args: true,
                usage: 'dtinvite <...Mentions>',
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
        const db = await client.database.guilds.fetch(message.guild.id);
        const category = await db.dynamicVoice('category');
        const enabled = await db.dynamicVoice('enabled');
        if (!category || !enabled) {
            return message.channel.send(new MessageEmbed()
                .setColor('RED')
                .setFooter(message.author.tag, message.author.displayAvatarURL() || null)
                .setDescription('Hey, Dynamic Feature is disabled or Dynamic Category cannot be found, contact server admins to enable/fix this')
            );
        }
        if (message.channel.parentID !== category) {
            return message.channel.send(new MessageEmbed()
                .setColor('RED')
                .setFooter(message.author.tag, message.author.displayAvatarURL() || null)
                .setDescription('Hey, you can\'t invite users outside a private text channel')
            );
        }
        if (!message.channel.permissionsFor(message.member).has(['MANAGE_CHANNEL'])) {
            return message.channel.send(new MessageEmbed()
                .setColor('RED')
                .setFooter(message.author.tag, message.author.displayAvatarURL() || null)
                .setDescription('Hey, you can\'t invite users to this private channel')
            );
        }
        const users = message.mentions.members;
        if (!users) {
            return message.channel.send(new MessageEmbed()
                .setColor('RED')
                .setFooter(message.author.tag, message.author.displayAvatarURL() || null)
                .setDescription('Hey, you need to mention who you gonna invite to this channel.')
            );
        }
        for (const m of users) {
            await message.channel.createOverwrite(m, {
                SEND_MESSAGES: true,
                VIEW_CHANNEL: true,
                READ_MESSAGE_HISTORY: true,
            });
        }
        message.channel.send(`Members has been added to this channel`);
    }
}