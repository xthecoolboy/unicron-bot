
const { Admin } = require('../database/database.js');
const { Random } = require('../utils/');

module.exports = class Unicron {
    /**
     * 
     * @param {Object} options Options
     */
    constructor(options) {
        this.owner = options.owner;
        this.server = options.server;
        this.serverInviteURL = options.inviteURL;
        this.channel = options.channel;
        this.modChannel = options.modChannel;
        this.host = options.hostURL;
    }
    database(table, model) {
        return new Promise(async (resolve, reject) => {
            let data = await Admin.findOne({ where: { table: table }});
            if (!data) data = await Admin.create({ table });
            if (typeof model === 'boolean') return resolve(data);
            return resolve(data.data);
        });
    }
};