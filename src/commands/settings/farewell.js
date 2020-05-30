
const Discord = require('discord.js');

module.exports = {
    /**
     * 
     * @param {Discord.Client} client Client
     * @param {Discord.Message} message Message
     * @param {Array} args Arguments
     */
    run: async function (client, message, args) {
        if (message.flags.includes('interactive')) {
            await message.channel.send('Interactive Farewell setup...');

            const response1 = await client.awaitReply(message, `Enter Channel name:\nEg: \`#channel\`\n\nType \`cancel\` to exit this setup.`, 20000, true);
            if (!response1) return message.channel.send(`No response... Exiting setup...`);
            if (response1.content === 'cancel') return message.channel.send(`Exiting setup...`);
            const channel = response1.mentions.channels.first();
            if (!channel || channel.type !== 'text') return message.channel.send(`Invalid channel... Exiting setup...Try again...`);
            if (!channel.permissionsFor(message.guild.me).has(['SEND_MESSAGES'])) return message.channel.send('Unicron doesn\'t have permissions to that channel, please give Unicron access to that channel for this to work and try again...Exiting Setup');

            const response2 = await client.awaitReply(message, `Ok, now Enter Farewell message (Must include \`{user}\` placeholer)\nEg: \`Farewell {user} to this awesome server!\`\n\nType \`cancel\` to exit this setup`, 40000, true);
            if (!response2) return message.channel.send(`No response... Exiting setup...`);
            if (response2 === 'cancel') return message.channel.send(`Exiting setup...`);
            if (!response2.content.includes('{user}')) return message.channel.send(`Missing placeholer \`{user}\`... Exiting setup...Try again...`);

            const model = await message.guild.db.leaver(true);
            model.channel = channel.id;
            model.message = response2.content.replace(/`/g, '`' + String.fromCharCode(8203))
                                            .replace(/@/g, '@' + String.fromCharCode(8203));
            model.enabled = true;
            await model.save();
            message.channel.send('Setup complete! Testing it now...')
            return client.emit('guildMemberRemove', message.member);
        }
        const [key, ...value] = args;
        switch (key) {
            case 'channel': {
                const channel = message.mentions.channels.first();
                if (!channel || channel.type !== 'text') return message.channel.send(`\`ERROR\`: Invalid channel... Try again...`);
                if (!channel.permissionsFor(message.guild.me).has(['SEND_MESSAGES'])) return message.channel.send('Unicron doesn\'t have permissions to that channel, please give Unicron access to that channel for this to work and try again.');
                const model = await message.guild.db.leave(true);
                model.channel = channel.id;
                await model.save();
                client.emit('guildMemberRemove', message.member);
                return message.channel.send(`Farewell channel has been set to ${channel}.`);
            }
            case 'message': {
                const msg = value.join(' ').replace(/`/g, '`' + String.fromCharCode(8203))
                    .replace(/@/g, '@' + String.fromCharCode(8203));
                if (!msg.includes('{user}')) return message.channel.send(`Missing placeholer \`{user}\`... Please try again...`);
                const model = await message.guild.db.leaver(true);
                model.message = msg;
                await model.save();
                client.emit('guildMemberRemove', message.member);
                return message.channel.send(`Welcome Message has been set to \n\`${msg}\``);
            }
            case 'enable':
            case 'disable': {
                const stat = key === 'enable';
                const model = await message.guild.db.leaver(true);
                model.enabled = stat;
                await model.save();
                return message.channel.send(`Farewell has been \`${stat ? 'enabled' : 'disabled'}\`.`);
            }
            default:
                return message.channel.send(new Discord.MessageEmbed()
                    .setColor('RED')
                    .setTimestamp()
                    .setFooter(message.author.tag, message.author.displayAvatarURL() || client.user.displayAvatarURL())
                    .setDescription('Error: Invalid Key provided, Please try again.')
                );
        }
    },
    config: {
        name: 'farewell',
        description: 'Farewell configuration module!',
        permission: 'Server Administrator',
    },
    options: {
        aliases: [],
        clientPermissions: [],
        cooldown: 10,
        nsfwCommand: false,
        args: true,
        usage: 'farewell -interactive\nfarewell channel [ChannelMention]\nfarewell message [...Message]\n\`^(_Must include {user} placeholder for this to work!_)^\`\nfarewell [enable|disable]',
        donatorOnly: false,
        premiumServer: false,
    }
}