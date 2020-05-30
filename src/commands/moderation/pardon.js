
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
        name: 'pardon',
        description: 'Pardon/unban someone from the server!',
        permission: 'Server Moderator',
    },
    options: {
        aliases: [],
        clientPermissions: ['MANAGE_MEMBERS'],
        cooldown: 10,
        nsfwCommand: false,
        args: true,
        usage: 'pardon [UserID]',
        donatorOnly: false,
        premiumServer: false,
    }
}