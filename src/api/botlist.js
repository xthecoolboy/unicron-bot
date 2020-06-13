
const DBots = require('dbots');

module.exports = (client) => {
    client.BotListPoster = new DBots.Poster({
        client,
        apiKeys: {
            glennbotlist: process.env.GLENN_BL_TOKEN,
        },
        clientLibrary: 'discord.js',
    });
}