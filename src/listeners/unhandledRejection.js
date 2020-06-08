const { error_tracing } = require('../../config.json');

module.exports = (client) => {
    process.on('unhandledRejection', (err) => {
        const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, 'g'), './');
        client.logger.error(`Unhandled Rejection: ${errorMsg}`);
        error_tracing ? console.trace(err) : console.log(err);
    });
}