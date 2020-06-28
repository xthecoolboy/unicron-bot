module.exports = {
    unicron: {
        owner: process.env.BOT_OWNER_ID,
        server: process.env.BOT_SERVER_ID,
        channel: process.env.BOT_CHANNEL_ID,
        modChannel: process.env.BOT_MODCHANNEL_ID,
        hostURL: process.env.BOT_HOST_URL,
        inviteURL: process.env.BOT_SERVER_URL
    },
    BotLists: {
        glennbotlist: {
            token: process.env.GLENN_TOKEN,
            endpoint: 'https://glennbotlist.xyz/api/bot/:id/stats',
            /**
             * 
             * @param {Number} a
             * @param {Number} b
             */
            parse: function (a, b) {
                return {
                    serverCount: a,
                    shardCount: b,
                }
            }
        },
        arcane: {
            token: process.env.ARCANE_TOKEN,
            endpoint: 'https://arcane-botcenter.xyz/api/:id/stats',
            /**
             * 
             * @param {Number} a
             * @param {Number} b
             * @param {Number} c
             */
            parse: function (a, b, c) {
                return {
                    server_count: a,
                    shard_count: b,
                    member_count: c,
                }
            }
        },
        mythicalbots: {
            token: process.env.MYTHICAL_TOKEN,
            endpoint: 'https://mythicalbots.xyz/api/bot/:id',
            /**
             * 
             * @param {Number} a
             */
            parse: function (a) {
                return {
                    server_count: a,
                }
            }
        },
        listmybots: {
            token: process.env.LMB_TOKEN,
            endpoint: 'https://listmybots.com/api/bot/:id',
            /**
             * 
             * @param {Number} a
             */
            parse: function (a) {
                return {
                    server_count: a,
                    count: a,
                }
            }
        },
        discordboats: {
            token: process.env.BOAT_TOKEN,
            endpoint: 'https://discord.boats/api/bot/:id',
            /**
             * 
             * @param {Number} a
             */
            parse: function (a) {
                return {
                    server_count: a,
                }
            }
        },
        botsfordiscord: {
            token: process.env.BFD_TOKEN,
            endpoint: 'https://botsfordiscord.com/api/bot/:id',
            /**
             * 
             * @param {Number} a
             */
            parse: function (a) {
                return {
                    server_count: a,
                }
            }
        },
        topgg: {
            token: process.env.TOPGG_TOKEN,
            endpoint: 'https://top.gg/api/bots/:id/stats',
            /**
             * 
             * @param {Number} a
             */
            parse: function (a) {
                return {
                    server_count: a,
                }
            }
        },
        botsondiscord: {
            token: process.env.BOD_TOKEN,
            endpoint: 'https://bots.ondiscord.xyz/bot-api/bot/:id/guilds',
            /**
             * 
             * @param {Number} a
             */
            parse: function (a) {
                return {
                    guildCount: a,
                }
            }
        },
        discordbotsgg: {
            token: process.env.DBG_TOKEN,
            endpoint: 'https://discord.bots.gg/api/v1/bots/:id/stats',
            /**
             * 
             * @param {Number} a
             * @param {Number} b
             */
            parse: function (a, b) {
                return {
                    guildCount: a,
                    shardCount: b,
                }
            }

        },
        discordbotlist: {
            token: process.env.DBL_TOKEN,
            endpoint: 'https://discordbotlist.com/api/v1/bots/:id/stats',
            /**
             * 
             * @param {Number} a
             */
            parse: function (a) {
                return {
                    guilds: a,
                }
            }
        },
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