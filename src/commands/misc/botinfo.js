
const Discord = require('discord.js');
const ms = require('ms');
const { version } = require('../../../package.json');

module.exports = {
    run: async function (client, message, args) {
        const OWNER = await client.users.fetch(client.unicron.owner);
        message.channel.send(new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle('Unicron Stats')
            .setAuthor(`Unicron ${version}`)
            .setThumbnail(client.user.displayAvatarURL())
            .addField('Owner', `${OWNER.tag} / ${OWNER.id}`)
            .addField('Uptime', `${ms(client.uptime)}`, true)
            .addField('Guild Count', `${client.guilds.cache.size}`, true)
            .addField('WebSocket Ping', `${client.ws.ping}ms`, true)
            .addField('Member Count', `${client.users.cache.size}`, true)
            .addField('Text Channel Count', `${client.channels.cache.filter(channel => channel.type === 'text').size.toHumanString()}`, true)
            .addField('Voice Channel Count', `${client.channels.cache.filter(channel => channel.type === 'voice').size.toHumanString()}`, true)
            .addField('Memory', `${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB RSS
                                ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB Heap`, true)
            .addField('Node', `${process.version} on ${process.platform} ${process.arch}`, true)
            .setTimestamp()
            );
    },
    config: {
        name: 'botinfo',
        description: 'Check\'s bot\'s status',
        permission: 'User',
    },
    options: {
        aliases: ['uptime', 'botstats'],
        cooldown: 3,
        args: false,
        usage: '',
        donatorOnly: false,
    }
}