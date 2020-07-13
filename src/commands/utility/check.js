const BaseCommand = require('../../classes/BaseCommand');
const Client = require('../../classes/Unicron');
const { Message } = require('discord.js');

module.exports = class extends BaseCommand {
    constructor() {
        super({
            config: {
                name: 'check',
                description: 'Make the bot react [/]',
                permission: 'User',
            },
            options: {
                aliases: [],
                clientPermissions: ['ADD_REACTIONS'],
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
     * @returns {Promise<Message|boolean>}
     * @param {Client} client 
     * @param {Message} message 
     * @param {Array<string>} args
     */
    async run(client, message, args) {
        message.react(await client.getEmoji('yes')).catch(() => {
            message.channel.send('Oops, there was a problem reacting');
        })
    }
}