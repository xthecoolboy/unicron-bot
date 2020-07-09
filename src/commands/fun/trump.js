
const { Message } = require('discord.js');
const Client = require('../../classes/Unicron');
const BaseCommand = require('../../classes/BaseCommand');
const fetch = require('node-fetch');

module.exports = class extends BaseCommand {
    constructor() {
        super({
            config: {
                name: 'trump',
                description: 'Sends a random stupid thing that Donald Trump said!',
                permission: 'User',
            },
            options: {
                aliases: [],
                clientPermissions: [],
                cooldown: 10,
                nsfwCommand: true,
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
        try {
            const response = await fetch(`https://www.tronalddump.io/random/quote`);
            const body = await response.json();
            message.channel.send(body.value);
        } catch (e) {
            throw e;
        }
    }
}