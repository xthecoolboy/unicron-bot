
module.exports = (client, message) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await client.unicron.database('blacklistedUsers');
            let guilds = await client.unicron.database('blacklistedGuilds');
            if (!users || !guilds) {
                if (!users) users = [];
                if (!guilds) guilds = [];
                return resolve(false);
            }
            if (message.guild) return guilds.hasOwnProperty(message.guild.id) ? resolve(true) : resolve(false);
            return users.hasOwnProperty(message.author.id) ? resolve(true) : resolve(false);
        } catch (e) {
            reject(e);
        }
    })
}