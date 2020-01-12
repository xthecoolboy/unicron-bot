module.exports = (client) => {
    require('./uncaughtException')(client);
    require('./unhandledRejection')(client);
    require('./warning')(client);
}