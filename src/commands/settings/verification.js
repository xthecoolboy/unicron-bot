
const Discord = require('discord.js');

module.exports = {
    /**
     * 
     * @param {Discord.Client} client Client
     * @param {Discord.Message} message Message
     * @param {Array} args Arguments
     */
    run: async function (client, message, args) {
        if (message.flags[0]) {
            switch (message.flags[0]) {
                case 'enable':
                case 'disable': {
                    const stat = message.flags[0] === 'enable';
                    const model = await message.guild.db.verification(true);
                    model.enabled = stat;
                    await model.save();
                    return message.channel.send(`Welcomer has been \`${stat ? 'enabled' : 'disabled'}\`.`);
                }
                default: {
                    return message.channel.send(new Discord.MessageEmbed()
                        .setColor('RED')
                        .setTimestamp()
                        .setFooter(message.author.tag, message.author.displayAvatarURL() || client.user.displayAvatarURL())
                        .setDescription('Error: Invalid Key provided, Please try again.')
                    );
                }
            }
        }
        await message.channel.send('Interactive Member Verification setup...');

        const response1 = await client.awaitReply(message, `Enter Verification Channel name:\nEg: \`#channel\`\n\nType \`cancel\` to exit this setup.`, 20000, true);
        if (!response1) return message.channel.send(`No response... Exiting setup...`);
        if (response1.content === 'cancel') return message.channel.send(`Exiting setup...`);
        const channel = response1.mentions.channels.first();
        if (!channel || channel.type !== 'text') return message.channel.send(`Invalid channel... Exiting setup...Try again...`);
        if (!channel.permissionsFor(message.guild.me).has(['SEND_MESSAGES', 'ADD_REACTIONS'])) return message.channel.send('Unicron doesn\'t have permissions to that channel, please give Unicron access to that channel for this to work and try again...Exiting Setup');

        const response2 = await client.awaitReply(message, `Enter Verified Role:\nEg: \`[RoleMention|RoleID|RoleName]\``, 20000, true);
        if (!response2) return message.channel.send(`No response... Exiting setup...`);
        if (response2.content === 'cancel') return message.channel.send(`Exiting setup...`);
        const role = response2.mentions.roles.first() || await message.guild.roles.fetch(response2.content) || message.guild.roles.cache.find((r) => r.name === response2.content);
        if (!role) return message.channel.send(`Invalid Role... Exiting setup...Try again...`);

        const response3 = await client.awaitReply(message, `Enter Verification Type:\nEg: \`[discrim|captcha|react]\``, 20000, true);
        if (!response3) return message.channel.send(`No response... Exiting setup...`);
        if (response3.content === 'cancel') return message.channel.send(`Exiting setup...`);
        if (!['discrim', 'captcha', 'react'].includes(response3.content)) return message.channel.send(`Invalid Type... Exiting setup...Try again...`);

        const model = await message.guild.db.verification(true);
        model.channel = channel.id;
        model.type = response3.content;
        model.role = role.id;
        model.enabled = true;
        await model.save();

        if (response3.content === 'react') {
            const m = await channel.send(new Discord.MessageEmbed()
                .setColor(0x00FF00)
                .setAuthor(client.user.tag, client.user.displayAvatarURL())
                .setDescription(`This server is protected by Unicron, React ${await client.getEmoji('yes')} to get yourself verified!`)
            );
            m.react(await client.getEmoji('yes'));
        }
        message.channel.send('Setup complete!');
    },
    config: {
        name: 'verification',
        description: 'Member Verification module configuration.',
        permission: 'User',
    },
    options: {
        aliases: ['verifier'],
        clientPermissions: [],
        cooldown: 10,
        nsfwCommand: false,
        args: false,
        usage: 'verification (Interactive Setup)\nverification [-enable|-disable]',
        donatorOnly: false,
        premiumServer: false,
    }
}