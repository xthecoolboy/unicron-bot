
module.exports = (client, message) => {
    return new Promise(async (resolve, reject) => {
        try {
            const Modelusers = await client.unicron.database('blacklistedUsers', true);
            const Modelguilds = await client.unicron.database('blacklistedGuilds', true);
            const users = Array.isArray(Modelusers.data) ? Modelusers.data : [];
            const guilds = Array.isArray(Modelguilds.data) ? Modelguilds.data : [];
            const ok = (users.find((item) => item.id === message.author.id) || guilds.find((item) => item.id === message.guilds.id)) ? true : false;
            resolve(ok);
        } catch (e) {
            reject(e);
        }
    })
}