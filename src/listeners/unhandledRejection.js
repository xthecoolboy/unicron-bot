module.exports = async (client) => {
    process.on('unhandledRejection', (err) => {
        const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, 'g'), './');
        client.logger.error(`Unhandled Rejection: ${errorMsg}`);
    });
}