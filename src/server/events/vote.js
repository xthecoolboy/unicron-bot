const BaseEvent = require('../../classes/BaseEvent');
const Voter = require('../../classes/Voter');
const Client = require('../classes/Server');
const UserProfile = require('../../classes/User');

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
        const db = new UserProfile(voter.id);
        await db.badges.add('voter');
        await db.inventory.add('votebox');
    }
}