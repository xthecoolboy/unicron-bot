const Server = require('./classes/Server');

const client = new Server();

(async function() {

    await client.register();

    await client.login(process.env.PORT);
    
})();