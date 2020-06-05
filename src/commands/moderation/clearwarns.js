
const Discord = require('discord.js');
const Member = require('../../handlers/Member');

module.exports = {
    /**
     * 
     * @param {Discord.Client} client Client
     * @param {Discord.Message} message Message
     * @param {Array} args Arguments
     */
    run: async function (client, message, args) {
        let target;
        if (message.mentions.users.size) target = message.mentions.users.first();
        else if (user) target = await client.users.fetch(user);
        else target = message.author;
        if (!target || target.bot) target = message.author;
        const member = new Member(target.id, message.guild.id);
        const warns = await member.warnings.fetchAll();
        if (warns) {
            await member.warnings.destroy();
            return message.channel.send(`${target}'s warnings cleared!`);
        }
        return message.channel.send(`${target}'s warnings was not cleared, because he/she doesn't have any warnings :P`);
    },
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
}