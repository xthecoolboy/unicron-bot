
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
            return false;
        }
    }, {
        name: 'Bot Administrator',
        level: 9,
        check: async function (client, message) {
            return false;
        }
    }, {
        name: 'Bot Owner',
        level: 10,
        check: function (client, message) {
            return client.unicron.owner === message.author.id;
        }
    },
];

module.exports = (client) => {
    client.permission = {};
    Levels.forEach((l) => {
        client.permission[l.level] = l.name;
    });
    client.permission.cache = Levels;
    client.permission.level = async function (client, message) {
        let num = 0;
        await Levels.forEach(async (level) => {
            num = await level.check(client,message) ? level.level : num;
        });
        return num;
    };
}