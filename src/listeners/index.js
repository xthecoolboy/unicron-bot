module.exports = async (client) => {
    await client.logger.info('Loading listeners...');
    await require('./uncaughtException')(client);
    await require('./unhandledRejection')(client);
    await require('./warning')(client);
    await client.logger.info('Listeners loaded.');
}