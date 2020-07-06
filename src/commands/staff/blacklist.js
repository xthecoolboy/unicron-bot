const { Admin } = require('../../database/database');
const { Message } = require('discord.js');
const Client = require('../../classes/Unicron');
const BaseCommand = require('../../classes/BaseCommand');
/**
 * 
 * @param {Client} client Client
 * @param {Message} message Message
 * @param {Array<string>} args Arguments
 */
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
            model.data = model.data.filter((item) => item.id !== id);
            await Admin.update({ data: model.data }, { where: { table: type } });
            return true;
        } else if (check) {
            const data = model.data.find((item) => { return item.id === id });
            if (!data) return false;
            if (message.flags.includes('guild')) return `Guild: ${await client.guilds.resolve(id).name} / ${id}\nReason: ${data.reason}\nModerator: ${data.issued_by}\nDate: ${data.when}`;
            return `User: ${await client.users.resolve(id).tag} / ${id}\nReason: ${data.reason}\nModerator: ${data.issued_by}\nDate: ${data.when}`;
        }
        model.data.push({
            id: id,
            reason: reason,
            issued_by: `${message.author.tag} / ${message.author.id}`,
            when: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
        });
        await Admin.update({ data: model.data }, { where: { table: type } });
        return true;
    } catch (e) {
        return e;
    }
}
module.exports = class extends BaseCommand {
    constructor() {
        super({
            config: {
                name: 'blacklist',
                description: `Usages:
\`\`\`bash
$ blacklist -user\` [UserID] [...reason]
$ blacklist -guild\` [GuildID] [...reason]
$ blacklist -pardon -user\` [UserID]
$ blacklist -pardon -guild\` [GuildID]
$ blacklist -fetch -user\` [UserID]
$ blacklist -fetch -guild\` [GuildID]
\`\`\`
`,
                permission: 'Bot Staff',
            },
            options: {
                cooldown: 3,
                nsfwCommand: false,
                args: false,
                usage: 'blacklist [flags] [a] [b]',
                donatorOnly: false,
                premiumServer: false,
            }
        });
    }
    /**
     * @returns {Promise<Message|boolean>}
     * @param {Client} client 
     * @param {Message} message 
     * @param {Array<string>} args 
     */
    async run(client, message, args) {
        return message.channel.send(`\`Output:\`\n\`\`\`xl\n${await evaluation(client, message, args)}\n\`\`\`\n`);
    }
}