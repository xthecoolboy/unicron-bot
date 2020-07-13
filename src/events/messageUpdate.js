
const Event = require('../classes/BaseEvent');
const Client = require('../classes/Unicron');
const { Message } = require('discord.js');

module.exports = class extends Event {
    constructor() {
        super('messageUpdate');
    }
    /**
     * @param {Client} client 
     * @param {Message} oldMessage 
     * @param {Message} newMessage
     */
    async run(client, oldMessage, newMessage) {
        if (newMessage.partial) await newMessage.fetch();
        client.emit('message', newMessage, false);
    }
}