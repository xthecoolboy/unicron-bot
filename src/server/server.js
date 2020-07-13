module.exports = async (Manager) => {
    const Server = require('./classes/Server');
    const client = new Server(Manager);
    await client.register();
    await client.login(process.env.PORT);
}