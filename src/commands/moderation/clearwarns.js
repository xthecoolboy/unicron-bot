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
                usage: 'clearwarns <UserMention|UserID>',
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
        const [user,] = args;
        let target = message.mentions.users.first() || client.users.cache.get(user);
        if (!target || target.bot) return message.channel.send(`I can't clear the warnings of an invalid user`);
        const member = new Member(target.id, message.guild.id);
        const warns = await member.warnings.fetchAll();
        if (warns) {
            await member.warnings.destroy();
            return message.channel.send(`${target}'s warnings cleared!`);
        }
        return message.channel.send(`${target}'s warnings was not cleared, because he/she doesn't have any warnings :P`);
    }
}