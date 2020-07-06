
const { Message } = require('discord.js');
const Client = require('../../classes/Unicron');
const BaseCommand = require('../../classes/BaseCommand');
const fetch = require('node-fetch');

module.exports = class extends BaseCommand {
    constructor() {
        super({
            config: {
                name: 'dadjoke',
                description: 'Sends a Random dad joke!',
                permission: 'User',
            },
            options: {
                aliases: ['dad'],
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
     * @returns {Promise<Message|boolean>}
     * @param {Client} client 
     * @param {Message} message 
     * @param {Array<string>} args 
     */
    async run(client, message, args) {
        try {
            const response = await fetch.default(`https://icanhazdadjoke.com/`, {
                headers: {
                    Accept: 'application/json'
                }
            });
            const body = await response.json();
            return message.channel.send(body.joke);
        } catch (e) {
            throw e;
        }
    }
}