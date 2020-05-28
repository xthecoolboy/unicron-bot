
const Discord = require('discord.js');

module.exports = {
    /**
     * 
     * @param {Discord.Client} client Client
     * @param {Discord.Message} message Message
     * @param {Array} args Arguments
     */
    run: async function (client, message, [key, ...value]) {
        try {
            if (message.flags.includes('setStatus')) {
                client.user.setStatus(key);
                return;
            }
            if (message.flags.includes('setActivity')) {
                client.user.setActivity(value.join(' '), { type: key });
                return;
            }
            if (message.flags.includes('setPresence')) {
                const status = key;
                const type = value.shift();
                const message = value.join(' ')
                client.user.setPresence({ activity: { name: message, type: type }, status: status });
                return;
            }
            if (message.flags.includes('resetGuildData')) {

            }
            if (message.flags.includes('resetUserData')) {

            }
        } catch (e) {
            message.channel.send(`\`ERROR\`
            \`\`\`xl
            ${e}
            \`\`\`
            `);
        }
    },
    config: {
        name: 'root',
        description: `Usages
        \`-setStatus\` [online|idle|dnd|offline]
        \`-setActivity\` [PLAYING|WATCHING|LISTENING|STREAMING] [...Message]
        \`-setPresence\` [online|idle|dnd|offline] [PLAYING|WATCHING|LISTENING|STREAMING] [...Message]
        \`-resetUserData\` [UserID]
        \`-resetGuildData\` [GuildID]
        `,
        permission: 'Bot Administrator',
    },
    options: {
        aliases: ['dev'],
        cooldown: 3,
        nsfwCommand: false,
        args: false,
        usage: 'root [Single flag] [a] [b]',
        donatorOnly: false,
        premiumServer: false,
    }
}