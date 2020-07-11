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
     * @returns {Promise<Message|boolean>}
     * @param {Client} client 
     * @param {Message} message 
     * @param {Array<string>} args 
     */
    async run(client, message, args) {
        const db = await client.database.guilds.fetch(message.guild.id, true);
        const category = db.dynamicVoice('category');
        const enabled = db.dynamicVoice('enabled');
        if (!category || !enabled) {
            return message.channel.send(new MessageEmbed()
                .setColor('RED')
                .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || null)
                .setDescription('Hey, Dynamic Feature is disabled or Dynamic Category cannot be found, contact server admins to enable/fix this')
            );
        }
        if (message.channel.parentID !== category) {
            return message.channel.send(new MessageEmbed()
                .setColor('RED')
                .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || null)
                .setDescription('Hey, you can\'t invite users outside a private text channel')
            );
        }
        if (!message.channel.permissionsFor(message.member).has(['MANAGE_CHANNEL'])) {
            return message.channel.send(new MessageEmbed()
                .setColor('RED')
                .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || null)
                .setDescription('Hey, you can\'t invite users to this private channel')
            );
        }
        const users = message.mentions.users;
        if (!users) {
            return message.channel.send(new MessageEmbed()
                .setColor('RED')
                .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || null)
                .setDescription('Hey, you need to mention who you gonna invite to this channel.')
            );
        }
        for (const m of users) {
            await message.channel.createOverwrite(m[0], {
                SEND_MESSAGES: true,
                VIEW_CHANNEL: true,
                READ_MESSAGE_HISTORY: true,
            }).catch(() => { });
        }
        message.channel.send(`Member(s) has been added to this channel`);
    }
}