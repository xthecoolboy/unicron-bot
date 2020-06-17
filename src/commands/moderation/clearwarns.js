const Member = require('../../classes/GuildMember');
const { Message } = require('discord.js');
const Client = require('../../classes/Unicron');
const BaseCommand = require('../../classes/BaseCommand');

module.exports = class extends BaseCommand {
    constructor() {
        super({
            config: {
                name: 'clearwarns',
                description: 'Clear warnings of a specific user!',
                permission: 'Server Moderator',
            },
            options: {
                aliases: ['clearwarnings'],
                clientPermissions: [],
                cooldown: 10,
                nsfwCommand: false,
                args: true,
                usage: 'clearwarns [UserMention|UserID]',
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
        const [user,] = args;
        let target = message.mentions.users.first() || client.users.cache.get(user) || message.author;
        if (!target || target.bot) target = message.author;
        const member = new Member(target.id, message.guild.id);
        const warns = await member.warnings.fetchAll();
        if (warns) {
            await member.warnings.destroy();
            return message.channel.send(`${target}'s warnings cleared!`);
        }
        return message.channel.send(`${target}'s warnings was not cleared, because he/she doesn't have any warnings :P`);
    }
}