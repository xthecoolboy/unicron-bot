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
            endpoint: 'http://glennbotlist.xyz/api/bot/:id/stats',
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
            endpoint: 'http://arcane-botcenter.xyz/api/:id/stats',
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
            endpoint: 'http://mythicalbots.xyz/api/bot/:id',
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
            endpoint: 'http://listmybots.com/api/bot/:id',
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
            endpoint: 'http://discord.boats/api/bot/:id',
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
            endpoint: 'http://botsfordiscord.com/api/bot/:id',
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
            endpoint: 'http://top.gg/api/bots/:id/stats',
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
            endpoint: 'http://bots.ondiscord.xyz/bot-api/bot/:id/guilds',
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
            endpoint: 'http://discord.bots.gg/api/v1/bots/:id/stats',
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
            endpoint: 'http://discordbotlist.com/api/v1/bots/:id/stats',
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
    managers: {
        users: {
            maximumCacheSize: 0,
        },
        guilds: {
            maximumCacheSize: 0,
        },
    },
}