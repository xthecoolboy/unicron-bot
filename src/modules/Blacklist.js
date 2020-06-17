const Client = require('../classes/Unicron');

/**
 * @param {Client} client
 * @param {Message} message
 */
module.exports = (client, user_id, guild_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const Modelusers = await client.unicron.database('blacklistedUsers', true);
            const Modelguilds = await client.unicron.database('blacklistedGuilds', true);
            const users = Array.isArray(Modelusers.data) ? Modelusers.data : [];
            const guilds = Array.isArray(Modelguilds.data) ? Modelguilds.data : [];
            const ok = (users.some((item) => item.id === user_id) || guilds.some((item) => item.id === guild_id)) ? true : false;
            resolve(ok);
        } catch (e) {
            reject(e);
        }
    })
}