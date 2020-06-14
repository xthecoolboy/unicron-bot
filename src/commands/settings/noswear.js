
const Discord = require('discord.js');
const { Message } = require('discord.js');
const Client = require('../../classes/Unicron');

module.exports = {
    /**
     * 
     * @param {Client} client Client
     * @param {Message} message Message
     * @param {Array<String>} args Arguments
     */
    run: async function (client, message, args) {
        const toggle = await message.guild.db.filters(true);
        toggle.swearFilter = !toggle.swearFilter;
        await toggle.save();
        message.channel.send(`No Swear has been ${toggle.swearFilter ? 'enabled' : 'disabled'}`);
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