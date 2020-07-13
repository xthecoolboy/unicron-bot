module.exports = class Event {
    /**
     * 
     * @param {'rateLimit'|'ready'|'resumed'|'guildCreate'|'guildDelete'|'guildUpdate'|'inviteCreate'|'inviteDelete'|'guildUnavailable'|'guildMemberAdd'|'guildMemberRemove'|'guildMemberUpdate'|'guildMemberAvailable'|'guildMemberSpeaking'|'guildMembersChunk'|'guildIntegrationsUpdate'|'roleCreate'|'roleDelete'|'roleUpdate'|'emojiCreate'|'emojiDelete'|'emojiUpdate'|'guildBanAdd'|'guildBanRemove'|'channelCreate'|'channelDelete'|'channelUpdate'|'channelPinsUpdate'|'message'|'messageDelete'|'messageUpdate'|'messageDeleteBulk'|'messageReactionAdd'|'messageReactionRemove'|'messageReactionRemoveAll'|'userUpdate'|'presenceUpdate'|'voiceStateUpdate'|'subscribe'|'unsubscribe'|'typingStart'|'webhookUpdate'|'disconnect'|'reconnecting'|'error'|'warn'|'debug'|'shardDisconnect'|'shardError'|'shardReconnecting'|'shardReady'|'shardResume'|'invalidated'|'raw'} eventName 
     */
    constructor(eventName) {
        this.eventName = eventName;
    }
}