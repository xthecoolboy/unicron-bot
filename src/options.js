module.exports = {
    unicron: {
        owner: process.env.BOT_OWNER_ID,
        server: process.env.BOT_SERVER_ID,
        channel: process.env.BOT_CHANNEL_ID,
        modChannel: process.env.BOT_MODCHANNEL_ID,
        hostURL: process.env.BOT_HOST_URL,
        inviteURL: process.env.BOT_SERVER_URL
    },
    clientOptions: {
        partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
        messageCacheMaxSize: 100,
        messageSweepInterval: 30,
    },
    botlisting: {
        apiKeys: {
            glennbotlist: process.env.GLENN_TOKEN,
            arcane: process.env.ARCANE_TOKEN,
            mythicalbots: process.env.MYTHICAL_TOKEN,
            listmybots: process.env.LMB_TOKEN,
            discordboats: process.env.BOAT_TOKEN,
            botsfordiscord: process.env.BFD_TOKEN,
            topgg: process.env.TOPGG_TOKEN,
            botsondiscord: process.env.BOD_TOKEN,
            discordbotsgg: process.env.DBG_TOKEN,
            discordbotlist: process.env.DBL_TOKEN,
        },
        clientLibrary: 'discord.js',
    }
}