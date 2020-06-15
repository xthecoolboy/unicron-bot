const { Message } = require('discord.js');
const Client = require('../../classes/Unicron');
const BaseCommand = require('../../classes/BaseCommand');

module.exports = class extends BaseCommand {
    constructor() {
        super({
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
        });
    }
    /**
     * @returns {Promise<Message|Boolean>}
     * @param {Client} client 
     * @param {Message} message 
     * @param {Array<String>} args 
     */
    async run(client, message, args) {
        const toggle = await message.guild.db.moderation(true);
        toggle.autoModeration = !toggle.autoModeration;
        await toggle.save();
        message.channel.send(`Auto Moderation has been ${toggle.autoModeration ? 'enabled' : 'disabled'}`);
    }
}