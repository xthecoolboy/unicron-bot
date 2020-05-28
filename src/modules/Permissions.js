
const Levels = [
    {
        name: 'User',
        level: 1,
        check: function () {
            return true;
        }
    }, {
        name: 'Server Moderator',
        level: 2,
        check: async function (client, message) {
            const role = await message.guild.db.moderation('moderatorRole');
            return role ? message.member.roles.cache.has(role) : false;
        }
    }, {
        name: 'Server Administrator',
        level: 3,
        check: async function (client, message) {
            const role = await message.guild.db.moderation('adminRole');
            return role ? message.member.roles.cache.has(role) : false;
        }
    }, {
        name: 'Server Owner',
        level: 4,
        check: async function (client, message) {
            return message.author.id === message.guild.ownerID;
        }
    }, {
        name: 'Bot Moderator',
        level: 8,
        check: async function (client, message) {
            const gg = await client.guilds.fetch(client.unicron.server);
            const mem = await gg.members.fetch(message.author.id);
            return mem ? mem.roles.cache.has(client.unicron.moderatorRole) : false;
        }
    }, {
        name: 'Bot Administrator',
        level: 9,
        check: async function (client, message) {
            const gg = await client.guilds.fetch(client.unicron.server);
            const mem = await gg.members.fetch(message.author.id);
            return mem ? mem.roles.cache.has(client.unicron.adminRole) : false;
        }
    }, {
        name: 'Bot Owner',
        level: 10,
        check: function (client, message) {
            return client.unicron.owner === message.author.id;
        }
    },
]
const permCache = {};

(function () {
    Levels.forEach((l) => {
        permCache[l.name] = l.level;
    })
})();

module.exports = (client) => {
    client.permission.level = async function (client, message) {
        return await Levels.reduce(async (level, cur) => {
            level = await cur.check(client, message) ? cur.level : level;
        }, 0);
    };
    client.permission.levels = permCache;
}