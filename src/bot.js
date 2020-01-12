
module.exports = (client) => {
    require('./utils/')(client);
    require('./modules/')(client);
}