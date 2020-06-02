
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
        toggle.swearFilter = !toggle.swearFilter;
        toggle.save();
        message.channel.send(`No Swear has been ${toggle.inviteFilter ? 'enabled' : 'disabled'}`);
    },
    config: {
        name: 'noswear',
        description: 'Toggles Swear Filter module',
        permission: 'Server Administrator',
    },
    options: {
        aliases: ['swearfilter'],
        clientPermissions: ['MANAGE_MESSAGES'],
        cooldown: 10,
        nsfwCommand: false,
        args: false,
        usage: '',
        donatorOnly: false,
        premiumServer: false,
    }
}