
const Discord = require('discord.js');

module.exports = {
    /**
     * 
     * @param {Discord.Client} client Client
     * @param {Discord.Message} message Message
     * @param {Array} args Arguments
     */
    run: async function (client, message, args) {
        const toggle = await message.guild.db.filters(true);
        toggle.inviteFilter = !toggle.inviteFilter;
        await toggle.save();
        message.channel.send(`inviteFilter has been ${toggle.inviteFilter ? 'enabled' : 'disabled'}`);
    },
    config: {
        name: 'invitefilter',
        description: 'Toggles inviteFilter module',
        permission: 'Server Administrator',
    },
    options: {
        aliases: [],
        clientPermissions: ['MANAGE_MESSAGES'],
        cooldown: 10,
        nsfwCommand: false,
        args: false,
        usage: '',
        donatorOnly: false,
        premiumServer: false,
    }
}