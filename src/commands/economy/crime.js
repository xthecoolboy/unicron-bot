
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
        name: 'crime',
        description: 'Commit a crime and earn coins! Beware...the cops..',
        permission: 'User',
    },
    options: {
        aliases: [],
        clientPermissions: [],
        cooldown: 3,
        nsfwCommand: false,
        args: false,
        usage: '',
        donatorOnly: false,
        premiumServer: false,
    }
}