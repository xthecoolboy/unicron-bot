
const Discord = require('discord.js');

module.exports = {
    /**
     * 
     * @param {Discord.Client} client Client
     * @param {Discord.Message} message Message
     * @param {Array} args Arguments
     */
    run: async function (client, message, args) {

    },
    config: {
        name: 'kick',
        description: 'Kick a member from the server!',
        permission: 'Server Moderator',
    },
    options: {
        aliases: ['spank'],
        clientPermissions: ['KICK_MEMBERS'],
        cooldown: 10,
        nsfwCommand: false,
        args: true,
        usage: 'kick [UserMention|UserID|UserTag] [...Reason]',
        donatorOnly: false,
        premiumServer: false,
    }
}