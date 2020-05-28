
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
        description: `Usages:
        \`-setPresence [Status] [Activity] [...Message]\`
        \`-resetUserData [UserID]\` 
        \`-resetGuildData [GuildID]\` 
        \`-moderator [-add|-remove] [UserID]\`
        \`-admin [-add|-remove] [UserID]\`
        \`-partner [-add|-remove] [UserID]\`
        \`-tester [-add|-remove] [UserID]\`
        \`-supporter [-add|-remove] [UserID]\`
        \`-codes [-add|-remove|-regenerate] [-user|-guild] [name|amount]\`
        `,
        permission: 'Bot Owner',
    },
    options: {
        aliases: ['dev'],
        cooldown: 3,
        nsfwCommand: false,
        args: true,
        usage: 'root [Flags] [...values]',
        donatorOnly: false,
        premiumServer: false,
    }
}