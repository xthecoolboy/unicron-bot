module.exports = (client) => {
    client.user.setActivity(`${client.guilds.cache.size} guilds`, { type: 'WATCHING' });
    client.user.setStatus('dnd');
    client.logger.cmd(`Bot ready as \'${client.user.tag}\', \'${client.user.id}\' with ${client.commands.size} commands.`);
}