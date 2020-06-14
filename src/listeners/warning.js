
module.exports = async (client) => {
    process.on('warning', (err) => {
        client.logger.warn(err);
    });
}