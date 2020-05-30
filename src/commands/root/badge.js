
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
        name: 'badge',
        description: 'Add/Remove/fetch someone an exlusive badge.',
        permission: 'Bot Owner',
    },
    options: {
        aliases: [],
        clientPermissions: [],
        cooldown: 3,
        nsfwCommand: false,
        args: true,
        usage: 'badge [-add|-remove|-fetch] [UserID] [BadgeName]',
        donatorOnly: false,
        premiumServer: false,
    }
}