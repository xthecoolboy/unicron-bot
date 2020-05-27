
module.exports = (client, event) => {
    setTimeout(() => client.destroy().then(() => client.login(process.env.BOT_TOKEN)), 10000);
    client.logger.error(`[DISCONNECT] Notice: Disconnected from gateway with code ${event.code} - Attempting reconnect.`);
}