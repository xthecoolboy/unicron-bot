const Discord = require('discord.js');
const ms = require('pretty-ms');
const { version } = require('../../../package.json');
const { version: discordjsVersion } = require('discord.js');
const { Message } = require('discord.js');
const Client = require('../../classes/Unicron');
const BaseCommand = require('../../classes/BaseCommand');

module.exports = class extends BaseCommand {
    constructor() {
        super({
            config: {
                name: 'botinfo',
                description: 'Check\'s bot\'s status',
                permission: 'User',
            },
            options: {
                aliases: ['uptime', 'botstats', 'stats'],
                cooldown: 3,
                args: false,
                usage: '',
                donatorOnly: false,
            }
        });
    }
    /**
     * @returns {Promise<Message|Boolean>}
     * @param {Client} client 
     * @param {Message} message 
     * @param {Array<String>} args 
     */
    async run(client, message, args) {
        const OWNER = await client.users.fetch(client.unicron.owner, false);
        message.channel.send(new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`Unicron v${version}`)
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            .addField('Uptime', `${ms(client.uptime)}`, true)
            .addField('WebSocket Ping', `${client.ws.ping}ms`, true)
            .addField('Memory', `${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB RSS\n${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB Heap`, true)
            .addField('Guild Count', `${await client.getCount('guilds')}`, true)
            .addField('User Count', `${await client.getCount('users')}`, true)
            .addField('Shard Count', `${client.shard.count} shard(s)`, true)
            .addField('Commands', `${client.commands.size} cmds`,true)
            .addField('Node', `${process.version} on ${process.platform} ${process.arch}`, true)
            .addField('Discord.js', `${discordjsVersion}`, true)
            .setTimestamp()
        );
    }
}