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
        const toggle = await message.guild.db.moderation(true);
        toggle.autoModeration = !toggle.autoModeration;
        await toggle.save();
        message.channel.send(`Auto Moderation has been ${toggle.autoModeration ? 'enabled' : 'disabled'}`);
    },
    config: {
        name: 'automod',
        description: 'Toggles AutoModeration on the server!',
        permission: 'Server Administrator',
    },
    options: {
        aliases: ['automoderation'],
        clientPermissions: [],
        cooldown: 10,
        nsfwCommand: false,
        args: false,
        usage: '',
        donatorOnly: false,
        premiumServer: false,
    }
}