
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
            if (message.flags.includes('setPresence')) {
                const status = key;
                const type = value.shift();
                const message = value.join(' ')
                client.user.setPresence({ activity: { name: message, type: type }, status: status });
                return;
            }
        } catch (e) {
            message.channel.send(`\`ERROR\`\n\`\`\`xl\n${e}\n\`\`\`\n`);
        }
    },
    /**
        \`-setPresence [Status] [Activity] [...Message]\`
        \`-resetUserData [UserID]\` 
        \`-resetGuildData [GuildID]\` 
        \`-moderator [-add|-remove|-fetch] [UserID]\`
        \`-admin [-add|-remove|-fetch] [UserID]\`
        \`-partner [-add|-remove|-fetch] [UserID]\`
        \`-tester [-add|-remove|-fetch] [UserID]\`
        \`-supporter [-add|-remove|-fetch] [UserID]\`
        \`-codes [-add|-remove|-regenerate|-fetch] [-user|-guild] [name|amount]\`
     */
    config: {
        name: 'root',
        description: `Root Command.`,
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