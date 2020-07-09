
const Discord = require('discord.js');
const { Message } = require('discord.js');
const Client = require('../../classes/Unicron');
const BaseCommand = require('../../classes/BaseCommand');

module.exports = class extends BaseCommand {
    constructor() {
        super({
            config: {
                name: 'verification',
                description: 'Member Verification module configuration. The Bot Permissions below are required for the interactive setup',
                permission: 'User',
            },
            options: {
                aliases: ['verifier'],
                clientPermissions: ['SEND_MESSAGES', 'ADD_REACTIONS', 'MANAGE_CHANNELS', 'MANAGE_MESSAGES', 'MANAGE_ROLES'],
                cooldown: 10,
                nsfwCommand: false,
                args: false,
                usage: 'verification (Interactive Setup)\nverification [--enable|--disable]',
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
        if (message.flags[0]) {
            switch (message.flags[0]) {
                case 'enable':
                case 'disable': {
                    const stat = message.flags[0] === 'enable';
                    const model = message.guild.db.verification(true);
                    model.enabled = stat;
                    await model.save();
                    return message.channel.send(`Member Verification has been \`${stat ? 'enabled' : 'disabled'}\`.`);
                }
                default: {
                    return message.channel.send(new Discord.MessageEmbed()
                        .setColor('RED')
                        .setTimestamp()
                        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                        .setDescription('Error: Invalid flag provided, Please try again.')
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
        if (!channel.permissionsFor(message.guild.me).has(['SEND_MESSAGES', 'ADD_REACTIONS', 'MANAGE_MESSAGES', 'MANAGE_ROLES'])) return message.channel.send('Unicron doesn\'t have permissions to that channel, please give Unicron access to that channel for this to work and try again...Exiting Setup');

        const response2 = await client.awaitReply(message, `Enter Verified Role:\nEg: \`[RoleMention|RoleID|RoleName]\``, 20000, true);
        if (!response2) return message.channel.send(`No response... Exiting setup...`);
        if (response2.content === 'cancel') return message.channel.send(`Exiting setup...`);
        const role = client.resolveRole(response2.content, message.guild);
        if (!role) return message.channel.send(`Invalid Role... Exiting setup...Try again...`);

        const response3 = await client.awaitReply(message, `Enter Verification Type:\nEg: \`[discrim|captcha|react]\``, 20000, true);
        if (!response3) return message.channel.send(`No response... Exiting setup...`);
        if (response3.content === 'cancel') return message.channel.send(`Exiting setup...`);
        if (!['discrim', 'captcha', 'react'].includes(response3.content)) return message.channel.send(`Invalid Type... Exiting setup...Try again...`);

        try {
            if (!channel.permissionOverwrites.get(message.guild.id)) {
                await channel.overwritePermissions(message.guild.id, {
                    SEND_MESSAGES: true,
                    VIEW_CHANNEL: true,
                    READ_MESSAGE_HISTORY: true,
                }).catch(e => { throw e });
            }
            for (let channels of message.guild.channels.cache.filter((c) => c.type === 'text')) {
                channels = channels[1];
                if (!channels.permissionOverwrites.get(message.guild.id)) {
                    await channels.overwritePermissions(message.guild.id, {
                        VIEW_CHANNEL: false,
                    }).catch(e => { throw e });
                }
            }
            if (!channel.permissionOverwrites.get(role.id)) {
                await channel.createOverwrite(role, {
                    VIEW_CHANNEL: false,
                }).catch(e => { throw e });
            }
        } catch (e) {

        }

        const model = message.guild.db.verification(true);
        model.channel = channel.id;
        model.type = response3.content;
        model.role = role.id;
        model.enabled = true;
        await model.save();

        if (response3.content === 'react') {
            const m = await channel.send(new Discord.MessageEmbed()
                .setColor(0x00FF00)
                .setAuthor(client.user.tag, client.user.displayAvatarURL({ dynamic: true }))
                .setDescription(`This server is protected by [Unicron](${client.unicron.serverInviteURL} 'Unicron's Support Server'), a powerful bot that prevents servers from being raided, React ${await client.getEmoji('yes')} to get yourself verified!`)
            );
            m.react(await client.getEmoji('yes'));
        }
        message.channel.send('Setup complete!');
    }
}