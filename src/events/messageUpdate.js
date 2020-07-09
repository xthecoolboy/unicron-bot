
const Event = require('../classes/BaseEvent');
const Client = require('../classes/Unicron');
const { Message } = require('discord.js');

module.exports = class extends Event {
    constructor() {
        super('messageUpdate');
    }
    /**
     * @param {Client} client 
     * @param {Message} message 
     */
    async run(client, oldMessage, newMessage) {
        client.emit('message', newMessage, false);
    }
}