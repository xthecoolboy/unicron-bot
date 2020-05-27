
const { Logger } = require('./utils/');

module.exports = (client) => {
    client.logger = Logger;
    require('./utils/functions')(client);
    require('./modules/')(client);
    require('./database/database.js').SyncDatabase();
}