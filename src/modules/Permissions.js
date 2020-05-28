
const levels = [
    {
        level: 0,
        name: 'User',
        check: () => {
            return true;
        }
    },
    {
        level: 2,
        name: 'Server Moderator',
        check: async (client, message) => {
            try {
                return message.member.roles.cache.has(await message.guild.db.moderation('moderatorRole'));
            } catch (e) {
                return false;
            }
        }
    },
    {
        level: 3,
        name: 'Server Administrator',
        check: async (client, message) => {
            try {
                return message.member.roles.cache.has(await message.guild.db.moderation('adminRole'));
            } catch (e) {
                return false;
            }
        }
    },
    {
        level: 4,
        name: 'Server Owner',
        check: (client, message) => { return message.guild.ownerID === message.author.id; }
    },
    {
        level: 8,
        name: 'Bot Moderator',
        check: async (client, message) => {
            try {
                const guildMod = await client.guilds.fetch(client.unicron.server);
                const memberMod = guildMod.members.cache.get(message.author.id);
                return memberMod.roles.cache.has(client.unicron.moderatorRole);
            } catch (e) {
                return false;
            }
        }
    },
    {
        level: 9,
        name: 'Bot Administrator',
        check: async (client, message) => {
            try {
                const guildAdmin = await client.guilds.fetch(client.unicron.server);
                const memberAdmin = guildAdmin.members.cache.get(message.author.id);
                return memberAdmin.roles.cache.has(client.unicron.adminRole);
            } catch (e) {
                return false;
            }
        }
    },
    {
        level: 10,
        name: 'Bot Owner',
        check: (client, message) => { 
            return client.unicron.owner === message.author.id;
        }
    }
]

module.exports = (client) => {
    client.levels = levels;
    client.levelCache = {};
    for (let i = 0; i < levels.length; i++) {
        const thisLevel = levels[i];
        client.levelCache[thisLevel.name] = thisLevel.level;
    }
    client.permlevel = async (client, message) => {
        let permlvl = 0;
        const permOrder = levels.slice(0).sort((p, c) => c.level - p.level);
        while (permOrder.length) {
            const currentLevel = permOrder.shift();
            if (await currentLevel.check(client, message)) {
                permlvl = currentLevel.level;
                break;
            }
        }
        return permlvl;
    };
}