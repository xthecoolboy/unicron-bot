const { error_tracing } = require('../../config.json');

module.exports = (client) => {
    process.on('unhandledRejection', (err) => {
        client.logger.error(`Unhandled rejection: ${err}`);
        error_tracing ? console.trace(err) : console.log(err);
    });
}