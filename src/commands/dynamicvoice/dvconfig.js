
const Discord = require('discord.js');

module.exports = {
    /**
     * 
     * @param {Discord.Client} client Client
     * @param {Discord.Message} message Message
     * @param {Array} args Arguments
     */
    run: async function (client, message, [action, key, ...value]) {
        const db = message.guild.db;
        switch (action) {
            case 'view': {
                const embed = new Discord.MessageEmbed()
                    .setColor('RANDOM')
                    .setDescription('You can also do \`dvsetup\` to setup Dynamic Voice interactively')
                    .addField('Key', `
                    \`category\`
                    \`waitingRoom\`
                    `, true)
                    .addField('Value', `
                    ${await db.dynamicVoice('category') ? `${message.guild.channels.cache.get(await db.dynamicVoice('category')).name}` : `\`none\``} }
                    ${await db.dynamicVoice('waitingRoom') ? `${message.guild.channels.cache.get(await db.dynamicVoice('waitingRoom')).name}` : `\`none\``}
                    `, true);
                message.channel.send(embed);
                break;
            }
            case 'set': {
                switch (key) {
                    case 'category': {
                        const channel = message.guild.channels.cache.get(value[0]);
                        if (!channel || channel.type !== 'category') return message.channel.send(`Invalid channel category, try again`);
                        if (!channel.permissionsFor(message.guild.me).has(['MANAGE_CHANNELS', 'MOVE_MEMBERS'])) return message.channel.send('Unicron doesn\'t have permissions to that channel, please give Unicron access to that channel for this to work and try again...');
                        const model = await db.dynamicVoice(true);
                        model.category = channel.id;
                        await model.save();
                        message.channel.send('Dynamic Voice Category set!');
                        break;
                    }
                    case 'waitingRoom': {
                        const channel = message.guild.channels.cache.get(value[0]);
                        if (!channel || channel.type !== 'voice') return message.channel.send(`Invalid voice channel, try again`);
                        if (!channel.permissionsFor(message.guild.me).has(['MANAGE_CHANNELS', 'MOVE_MEMBERS'])) return message.channel.send('Unicron doesn\'t have permissions to that channel, please give Unicron access to that channel for this to work and try again...');
                        const model = await db.dynamicVoice(true);
                        model.waitingRoom = channel.id;
                        await model.save();
                        message.channel.send('Dynamic Voice Waiting Room set!');
                        break;
                    }
                    default: {
                        return message.channel.send(new Discord.MessageEmbed()
                            .setColor('RED')
                            .setTimestamp()
                            .setFooter(message.author.tag, message.author.displayAvatarURL() || message.guild.iconURL())
                            .setDescription('Incorrect arguments, pls use `help dvconfig` for more information.')
                        );
                    }
                }
                break;
            }
            case 'enable':
            case 'disable': {
                break;
            }
            default: {
                return message.channel.send(new Discord.MessageEmbed()
                    .setColor('RED')
                    .setTimestamp()
                    .setFooter(message.author.tag, message.author.displayAvatarURL() || message.guild.iconURL())
                    .setDescription('Incorrect arguments, pls use `help dvconfig` for more information.')
                );
            }
        }
    },
    config: {
        name: 'dvconfig',
        description: 'Dynamic Voice Configuration',
        permission: 'Server Administrator',
    },
    options: {
        aliases: [],
        clientPermissions: ['MANAGE_CHANNELS', 'MOVE_MEMBERS'],
        cooldown: 3,
        nsfwCommand: false,
        args: true,
        usage: 'dvconfig [view|set|enable|disable] [key] [value]\n\nExamples:\ndvconfig set category 1426249876277277 (CHANNEL_ID)',
        donatorOnly: false,
        premiumServer: false,
    }
}