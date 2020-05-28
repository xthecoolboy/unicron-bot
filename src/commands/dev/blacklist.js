
const Discord = require('discord.js');

const { Regex } = require('../../utils/');

const filter = function (arr, key) {
    return arr.filter((item) => item.id !== key);
}

const evaluation = async function (client, message, args) {
    try {
        const pardon = message.flags.includes('pardon');
        const check = message.flags.includes('fetch');
        const type = message.flags.includes('guild') ? 'blacklistedGuilds' : 'blacklistedUsers';
        const id = args.shift();
        const reason = args.join(' ') || 'No reason provided';
        let model = await client.unicron.database(type, true);
        if (!id) return false;
        if (!model.data || !Array.isArray(model.data)) model.data = [];
        if (pardon) {
            if (!model.data.find((item) => { return item.id === id})) return false;
            model.data = model.data.filter((item) => item.id !== id);
            await model.save();
            return true;
        } else if (check) {
            const data = model.data.find((item) => { return item.id === id });
            if (!data) return false;
            return `ID: ${id}\nReason: ${data.reason}\nModerator: ${data.issued_by}\nDate: ${data.when}`;
        }
        model.data.push({
            id: id,
            reason: reason,
            issued_by: `${message.author.tag} / ${message.author.id}`,
            when: Date.now()
        });
        await model.save();
        return true;
    } catch (e) {
        return e;
    }
}

module.exports = {
    /**
     * 
     * @param {Discord.Client} client Client
     * @param {Discord.Message} message Message
     * @param {Array} args Arguments
     */
    run: async function (client, message, args) {
        message.channel.send(`\`Output:\`\n\`\`\`xl\n${await evaluation(client, message, args)}\n\`\`\`\n`);
    },
    config: {
        name: 'blacklist',
        description: `Usages:
        \`-user\` [UserID] [...reason]
        \`-guild\` [GuildID] [...reason]
        \`-pardon -user\` [UserID]
        \`-pardon -guild\` [GuildID]
        \`-fetch -user\` [UserID]
        \`-fetch -guild\` [GuildID]
        `,
        permission: 'Bot Moderator',
    },
    options: {
        cooldown: 3,
        nsfwCommand: false,
        args: false,
        usage: 'blacklist [flags] [a]',
        donatorOnly: false,
        premiumServer: false,
    }
}