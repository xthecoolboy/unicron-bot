
module.exports = (client) => {
    process.on('warning', (err) => {
        client.logger.warn(err);
    });
}