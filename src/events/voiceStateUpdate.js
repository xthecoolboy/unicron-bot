
const { Client, VoiceState } = require('discord.js');

const Guild = require('../handlers/Guild');
/**
 * @param {Client} Client
 * @param {VoiceState} oldState
 * @param {VoiceState} newState
 */
module.exports = async (client, oldState, newState) => {
    const db = new Guild(oldState.guild.id);
    const enabled = await db.dynamicVoice('enabled');
    if (!enabled || !oldState.guild.me.permissions.has(['MOVE_MEMBERS', 'MANAGE_CHANNELS'])) return;
    const waitingRoom = await db.dynamicVoice('waitingRoom');
    const category = await db.dynamicVoice('category');
    if (!!newState.channel) {
        if (newState.channel.id === waitingRoom) {
            newState.guild.channels.create(`${newState.member.displayName}'s voice channel`,
                {
                    type: 'voice',
                    parent: category,
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
