module.exports = (client) => {
    require('../listeners')(client);
    require('./Permissions')(client);
    require('./Emote')(client);
    require('./Commands')(client);
    require('./Events')(client);
}