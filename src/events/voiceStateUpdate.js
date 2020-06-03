
const { Client, VoiceState } = require('discord.js');

/**
 * @param {Client} Client
 * @param {VoiceState} oldState
 * @param {VoiceState} newState
 */
const Guild = require('../handlers/Guild');
module.exports = async (client, oldState, newState) => {
        const db = new Guild(oldState.guild.id);
        const waitingRoom = await db.dynamicVoice('waitingRoom')
        const category = await db.dynamicVoice('category')
        const enabled = await db.dynamicVoice('enabled');

        if(!!newState.channel){
            if(newState.channel.id === waitingRoom){
                newState.guild.channels.create(`${newState.member.displayName}'s voice channel`, {type: 'voice', parent: category, permissionOverwrites: [{id: newState.member.id, allow: ['MANAGE_CHANNELS']}]}).then(channel => {
                    newState.setChannel(channel)
                })
            }
        }
        if(!!oldState.channel){
            if(oldState.channel.parent.id === category && oldState.channel.id !== waitingRoom) oldState.channel.delete()
        }
    }
