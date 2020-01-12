module.exports = (client) => {
    require('./Commands')(client);
    require('./Events')(client);
}

module.exports = {
    Leveling: require('./Leveling'),
}