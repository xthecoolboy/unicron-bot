module.exports = async (Manager) => {
    const Server = require('./classes/Server');
    const client = new Server(Manager);
    await client.register();
    client.login(process.env.PORT);
}