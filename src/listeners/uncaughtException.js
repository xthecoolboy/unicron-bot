
const { error_tracing } = require('../../config.json');

module.exports = (client) => {
    process.on('uncaughtException', (err) => {
        const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, 'g'), './');
        client.logger.error(`Uncaught Exception: ${errorMsg}`);
        error_tracing ? console.trace(err) : console.log(err);
        process.exit(1);
    });
}