
const Discord = require('discord.js');

const { Message } = require('discord.js');
const Client = require('../../classes/Unicron');
const BaseCommand = require('../../classes/BaseCommand');

module.exports = class extends BaseCommand {
    constructor() {
        super({
            config: {
                name: 'dconfig',
                description: 'Dynamic Text/Voice Configuration',
                permission: 'Server Administrator',
            },
            options: {
                aliases: [],
                clientPermissions: [],
                cooldown: 3,
                nsfwCommand: false,
                args: true,
                usage: 'dconfig <view|set|enable|disable> <key> [value]\n\nExamples:\ndconfig set category 1426249876277277 (CHANNEL_ID)',
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
        const [action, key, ...value] = args;
        const db = await client.database.guilds.fetch(message.guild.id, true);
        switch (action) {
            case 'view': {
                const cid = db.dynamicVoice('category');
                const wid = db.dynamicVoice('waitingRoom');
                const category = message.guild.channels.cache.get(cid) ? `${message.guild.channels.cache.get(cid).name}` : `\`none\``;
                const waitingRoom = message.guild.channels.cache.get(wid) ? `${message.guild.channels.cache.get(wid).name}` : `\`none\``;
                const embed = new Discord.MessageEmbed()
                    .setColor('RANDOM')
                    .setDescription('You can also do \`dvsetup\` to setup Dynamic Voice interactively')
                    .addField('Key', `
                    \`category\`
                    \`waitingRoom\`
                    `, true)
                    .addField('Value', `
                    ${category}
                    ${waitingRoom}
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
                        const model = db.dynamicVoice(true);
                        model.category = channel.id;
                        await model.save();
                        message.channel.send('Dynamic Voice Category set!');
                        break;
                    }
                    case 'waitingRoom': {
                        const channel = message.guild.channels.cache.get(value[0]);
                        if (!channel || channel.type !== 'voice') return message.channel.send(`Invalid voice channel, try again`);
                        if (!channel.permissionsFor(message.guild.me).has(['MANAGE_CHANNELS', 'MOVE_MEMBERS'])) return message.channel.send('Unicron doesn\'t have permissions to that channel, please give Unicron access to that channel for this to work and try again...');
                        const model = db.dynamicVoice(true);
                        model.waitingRoom = channel.id;
                        await model.save();
                        message.channel.send('Dynamic Voice Waiting Room set!');
                        break;
                    }
                    default: {
                        return message.channel.send(new Discord.MessageEmbed()
                            .setColor('RED')
                            .setTimestamp()
                            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || message.guild.iconURL())
                            .setDescription('Incorrect arguments, pls use `help dvconfig` for more information.')
                        );
                    }
                }
                break;
            }
            case 'enable':
            case 'disable': {
                const bo = action === 'enable';
                const model = db.dynamicVoice(true);
                model.enabled = bo;
                await model.save();
                message.channel.send(`Dynamic Voice has been ${bo ? 'enabled' : 'disabled'}`);
                break;
            }
            default: {
                return message.channel.send(new Discord.MessageEmbed()
                    .setColor('RED')
                    .setTimestamp()
                    .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || message.guild.iconURL())
                    .setDescription('Incorrect arguments, pls use `help dconfig` for more information.')
                );
            }
        }
    }
}