
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
                    `, true)
                break;
            }
            case 'set': {
                switch (key) {
                    case 'category': {
                        const category = 
                        break;
                    }
                    case 'waitingRoom': {
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