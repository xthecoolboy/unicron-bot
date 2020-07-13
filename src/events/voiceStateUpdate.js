const { VoiceState } = require('discord.js');
const Client = require('../classes/Unicron');
const BaseEvent = require('../classes/BaseEvent');
const Blacklist = require('../modules/Blacklist');

module.exports = class extends BaseEvent {
    constructor() {
        super('voiceStateUpdate');
    }
    /**
     * @param {Client} client
     * @param {VoiceState} oldState
     * @param {VoiceState} newState
     */
    async run(client, oldState, newState) {
        if (await Blacklist(client, newState.member.user.id, newState.guild.id)) return;
        const db = await client.database.guilds.fetch(oldState.guild.id, true);
        const enabled = db.dynamicVoice('enabled');
        const waitingRoom = db.dynamicVoice('waitingRoom');
        const category = db.dynamicVoice('category');
        if (!enabled
            || oldState.member.user.bot
            || newState.member.user.bot
            || !oldState.guild.me.permissions.has(['MOVE_MEMBERS', 'MANAGE_CHANNELS', 'MANAGE_ROLES'])
            || !category
            || !waitingRoom
        ) return;

        if (!!newState.channel) {
            const dvlimit = newState.channel.parentID === category ? 11 : 10;
            if (newState.channel.id === waitingRoom && newState.channel.parent.children.filter((c) => c.type === 'voice').size <= dvlimit) {
                newState.guild.channels.create(`${newState.member.displayName}'s channel`,
                    {
                        type: 'voice',
                        parent: category,
                        permissionOverwrites: [
                            {
                                id: newState.member.id,
                                allow: ['MANAGE_CHANNELS', 'MOVE_MEMBERS', 'USE_VAD']
                            }
                        ]
                    }).then(channel => {
                        newState.setChannel(channel).catch(() => { });
                    }).catch(() => { });
            }
        }
        if (!!oldState.channel) {
            if (oldState.channel.parent.id === category && oldState.channel.id !== waitingRoom) {
                if (oldState.channel.members.size === 0) {
                    oldState.channel.delete().catch(() => { });
                }
            }
        }
    }
}