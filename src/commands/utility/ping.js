const { Message } = require('discord.js');
const Client = require('../../classes/Unicron');
const BaseCommand = require('../../classes/BaseCommand');

module.exports = class extends BaseCommand {
    constructor() {
        super({
            config: {
                name: 'ping',
                description: 'Checks Bot\'s ping and API Latency',
                permission: 'User',
            },
            options: {
                aliases: ['botping'],
                cooldown: 3,
                args: false,
                usage: '',
                donatorOnly: false,
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
        return message.channel.send('Ping?').then(msg => {
            msg.edit(`Pong! Latency is \`${msg.createdTimestamp - message.createdTimestamp}\`ms.\nAPI Latency is \`${Math.round(client.ws.ping)}ms\``);
        }).catch((e) => {
            client.logger.error(`Error : ${e}`);
            return false;
        });
    }
}