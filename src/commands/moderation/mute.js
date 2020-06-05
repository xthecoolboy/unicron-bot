
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

    },
    config: {
        name: 'mute',
        description: 'Mute a member from the server!',
        permission: 'Server Moderator',
    },
    options: {
        aliases: ['moot'],
        clientPermissions: ['MANAGE_ROLES'],
        cooldown: 10,
        nsfwCommand: false,
        args: true,
        usage: 'mute [UserMention|UserID] [...Reason]\nmute [UserMention|UserID|UserTag] [Duration] [...Reason]',
        donatorOnly: false,
        premiumServer: false,
    }
}