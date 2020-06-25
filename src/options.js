module.exports = {
    clientOptions: {
        partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
        messageCacheMaxSize: 100,
        messageSweepInterval: 30,
    },
    unicron: {
        owner: process.env.BOT_OWNER_ID,
        server: process.env.BOT_SERVER_ID,
        channel: process.env.BOT_CHANNEL_ID,
        modChannel: process.env.BOT_MODCHANNEL_ID,
        hostURL: process.env.BOT_HOST_URL,
        inviteURL: process.env.BOT_SERVER_URL
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
        clientID: '634908645896880128',
    },
    Authorizations: `
    dVV9uPm847uSGgR2BVMn
    RBUiJ7bRU46HnrlMR74I
    fu2pcJ97jwuype1urh4u
    XxI9k3THIEYiXQ6tfvSL
    aAavIPIYGKpojXYUxJcY
    DAZ5nFI5LgwVUv3vqTty
    AWAZr9I2F25VUV6KXEB9
    ZWeURMjxroQHjqC9bqFQ
    m2R5gqTRHIWFjRxiL87C
    klL6kyyK0unb3V0I4CSN
    pRW7zRx6A3UOsHDwlHZx
    F96ngeTPCnWA4gFDFMRa
    TfEIcjNCYGvZwJS0Mn9j
    sWmMc5Uds0uJWT12QYZB
    cYQ6GRSs5dWlMdKf0hsr
    1FwViqafCszU7As87qhe
    u1n4jAYTpLVntCcjOYlZ
    ueKngbQjNHZaxeVgtzq0
    0Lb6oSxon3oLShI6hStb
    AE7uogFqhS0s2dwDW48q
    `,
    managers: {
        users: {
            maximumCacheSize: 0,
        },
        guilds: {
            maximumCacheSize: 0,
        },
    },
}