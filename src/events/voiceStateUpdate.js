
const { VoiceState } = require('discord.js');

const Guild = require('../handlers/Guild');
const Client = require('../classes/Unicron');
const BaseEvent = require('../classes/BaseEvent');

module.exports = class extends BaseEvent {
    constructor() {
        super('voiceStateUpdate');
    }
    /**
     * @param {Client} Client
     * @param {VoiceState} oldState
     * @param {VoiceState} newState
     */
    async run(client, oldState, newState) {
        const db = new Guild(oldState.guild.id);
        const enabled = await db.dynamicVoice('enabled');
        const waitingRoom = await db.dynamicVoice('waitingRoom');
        const category = await db.dynamicVoice('category');
        if (!enabled ||
            !oldState.guild.me.permissions.has(['MOVE_MEMBERS', 'MANAGE_CHANNELS'])
            || !category
            || !waitingRoom
        ) return;

        if (!!newState.channel) {
            const dvlimit = newState.channel.parentID === category ? 11 : 10;
            if (newState.channel.id === waitingRoom && newState.channel.parent.children.size <= dvlimit) {
                newState.guild.channels.create(`${newState.member.displayName}'s voice channel`,
                    {
                        type: 'voice',
                        parent: category,
                        userLimit: 8,
                        permissionOverwrites: [
                            {
                                id: newState.member.id,
                                allow: ['MANAGE_CHANNELS']
                            }
                        ]
                    }).then(channel => {
                        newState.setChannel(channel)
                    });
            }
        }
        if (!!oldState.channel) {
            if (oldState.channel.parent.id === category && oldState.channel.id !== waitingRoom) {
                if (oldState.channel.members.size === 0) {
                    oldState.channel.delete();
                }
            }
        }
    }
}