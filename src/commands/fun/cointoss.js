const { Message } = require('discord.js');
const Client = require('../../classes/Unicron');
const BaseCommand = require('../../classes/BaseCommand');

module.exports = class extends BaseCommand {
    constructor() {
        super({
            config: {
                name: 'cointoss',
                description: 'Tails or Head?',
                permission: 'User',
            },
            options: {
                aliases: [],
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
        return message.channel.send(['🤴 Heads!', '🐛 Tails!'].random());
    }
}