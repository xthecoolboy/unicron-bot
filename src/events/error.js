module.exports = async (client, error) => {
    client.logger.log(`An error event was sent by Discord.js: \n${error.name}`, "error");
};