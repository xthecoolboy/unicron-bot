module.exports = async (client) => {
    await require('../listeners')(client);
    await require('./Permissions')(client);
    await require('./Emote')(client);
    await require('./Crates')(client);
    await require('./ShopItems')(client);
    await require('./Commands')(client);
    await require('./Events')(client);
}