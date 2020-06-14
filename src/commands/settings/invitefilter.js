
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