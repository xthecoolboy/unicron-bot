const Client = require('../classes/Unicron');

/**
 * @param {Client} client
 */
module.exports = (client) => {
    process.on('uncaughtException', (err) => {
        const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, 'g'), './');
        client.logger.error(`Uncaught Exception: ${errorMsg}`, 'Process');
        process.exit(1);
    });
    process.on('unhandledRejection', (err) => {
        const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, 'g'), './');
        client.logger.error(`Unhandled Rejection: ${errorMsg}`, 'Process');
    });
    process.on('warning', (err) => {
        client.logger.warn(err, 'Process');
    });
    process.on('beforeExit', (code) => {
        client.logger.info(`Exited with code ${code}`, 'Process');
    });
}