
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
        name: 'verification',
        description: 'Member Verification module configuration.',
        permission: 'User',
    },
    options: {
        aliases: ['verifier'],
        clientPermissions: [],
        cooldown: 10,
        nsfwCommand: false,
        args: false,
        usage: 'verification -interactive\nverification channel [ChannelMention|ChannelID]\nverification role [RoleMention|RoleID|RoleName]\nverification type [discrim|captcha|react]\nverification [enable|disable]',
        donatorOnly: false,
        premiumServer: false,
    }
}