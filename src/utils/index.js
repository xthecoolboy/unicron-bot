
module.exports = (client) => {
    require('./functions')(client);
}

module.exports = {
    Colors: require('./Colors'),
    Logger:  require('./Logger'),
    Mutex: require('./Mutex'),
    Random: require('./Random'),
    Regex: require('./Regex'),
}