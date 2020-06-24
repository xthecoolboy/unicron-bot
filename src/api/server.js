const API = require('./API');
const Server = new API();
(async function () {
    await Server.register();
    Server.listen(process.env.port).then((port) => {
        Server.logger.info(`API Server running on port : ${port}`);
    });
})();