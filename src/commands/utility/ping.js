
module.exports = {
    run: async function (client, message, args, guild, user) {
        return message.channel.send("Ping?").then(msg => {
            msg.edit(`Pong! Latency is \`${msg.createdTimestamp - message.createdTimestamp}\`ms.\nAPI Latency is \`${Math.round(client.ws.ping)}ms\``);
        }).catch(e => {
            client.logger.error(`Error : ${e}`);
            return false;
        });
    },
    config: {
        name: 'ping',
        description: 'Checks Bot\'s ping and API Latency',
        permission: 'User',
    },
    options: {
        aliases: ['botping'],
        cooldown: 3,
        args: false,
        usage: '',
        donatorOnly: false,
    }
}