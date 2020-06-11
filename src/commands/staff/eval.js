
module.exports = {
    run: async function (client, message, args) {
        const code = args.join(' ');
        try {
            const evaled = eval(code);
            const clean = await client.clean(client, evaled);
            return message.channel.send(`\`\`\`js\n${clean}\n\`\`\``);
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${await client.clean(client, err)}\n\`\`\``);
            return false;
        }
    },
    config: {
        name: 'eval',
        description: 'Evaluates Arbitary javascript.',
        permission: 'Bot Owner',
    },
    options: {
        cooldown: 3,
        nsfwCommand: false,
        args: true,
        usage: 'eval [...code]',
        donatorOnly: false,
    }
}