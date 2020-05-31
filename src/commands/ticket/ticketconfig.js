
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
            await message.channel.send('Interactive Ticket System setup...');
            const response1 = await client.awaitReply(message, 'Enter Ticket Category ID:\nEx: \`12345678906942069\`\n\nType \`cancel\` to exit this setup', 20000, true);
            if (!response1) return message.channel.send(`No response... Exiting setup...`);
            if (response1.content === 'cancel') return message.channel.send(`Exiting setup...`);
            const channel = response1.guild.channels.cache.get(response1.content);
            if (!channel || channel.type !== 'category') return message.channel.send(`Invalid channel category... Exiting setup...Try again...`);
            if (!channel.permissionsFor(message.guild.me).has(['SEND_MESSAGES', 'MANAGE_CHANNELS', 'VIEW_CHANNEL'])) return message.channel.send('Unicron doesn\'t have permissions to that channel, please give Unicron access to that channel for this to work and try again...Exiting Setup');

            const model = await message.guild.db.ticket(true);
            model.category = channel.id;
            model.enabled = true;
            await model.save();

            message.channel.send('Setup complete!');
        }
        if (message.flags.includes('enable') || message.flags.includes('disable') || message.flags.includes('category')) {
            switch (message.flags[0]) {
                case 'category': {
                    const channel = message.guild.channels.cache.get(args[0]);
                    if (!channel || channel.type !== 'category') return message.channel.send(`Invalid channel category... Exiting setup...Try again...`);
                    if (!channel.permissionsFor(message.guild.me).has(['SEND_MESSAGES', 'MANAGE_CHANNELS', 'VIEW_CHANNEL'])) return message.channel.send('Unicron doesn\'t have permissions to that channel, please give Unicron access to that channel for this to work and try again...Exiting Setup');
                    const model = await message.guild.db.ticket(true);
                    model.category = channel.id;
                    await model.save();
                    return message.channel.send(`Ticket System has been \`${channel.name}\`.`);
                }
                case 'enable':
                case 'disable': {
                    const stat = message.flags[0] === 'enable';
                    const model = await message.guild.db.ticket(true);
                    model.enabled = stat;
                    await model.save();
                    return message.channel.send(`Ticket System has been \`${stat ? 'enabled' : 'disabled'}\`.`);
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

    },
    config: {
        name: 'ticketconfig',
        description: 'Ticket System Configuration!',
        permission: 'Server Administrator',
    },
    options: {
        aliases: ['ticketconf'],
        clientPermissions: [],
        cooldown: 10,
        nsfwCommand: false,
        args: true,
        usage: 'ticketconfig -interactive\nticketconfig category [Category ID]\nticketconfig [-enable|-disable]',
        donatorOnly: false,
        premiumServer: false,
    }
}