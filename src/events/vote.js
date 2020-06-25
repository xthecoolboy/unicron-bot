const BaseEvent = require('../classes/BaseEvent');
const Voter = require('../classes/Voter');
const Client = require('../classes/Unicron');
const { MessageEmbed } = require('discord.js');
const UserProfile = require('../classes/User');

module.exports = class extends BaseEvent {
    constructor() {
        super('vote');
    }
    /**
     * 
     * @param {Client} client 
     * @param {Voter} voter 
     */
    async run(client, voter) {
        const user = await client.users.fetch(voter.id, false);
        const channel = await client.channels.fetch(client.unicron.channel, false);
        channel.send(new MessageEmbed()
            .setColor('RANDOM')
            .setTimestamp()
            .setAuthor(user.tag, user.displayAvatarURL({ dynamic: true}))
            .setDescription(`<@${user.id}> has voted Unicron on ${voter.list}`)
        );
        const db = new UserProfile(voter.id);
        await db.badges.add('voter');
        await db.inventory.add('votebox');
    }
}