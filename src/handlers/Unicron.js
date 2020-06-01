
const { Admin } = require('../database/database.js');
const { Random } = require('../utils/');

const token = function () {
    return Random.string(16);
}

class Unicron {
    /**
     * 
     * @param {JSON} options Options
     */
    constructor(options) {
        this.owner = options.owner;
        this.server = options.server;
        this.serverInviteURL = options.inviteURL;
        this.channel = options.channel;
        this.modChannel = options.modChannel;
        this.moderatorRole = options.moderatorRole;
        this.adminRole = options.adminRole;
        this.host = options.hostURL;
    }
    database(table, model) {
        return new Promise(async (resolve, reject) => {
            const [data,] = await Admin.findOrCreate({ where: { table: table } });
            if (typeof model === 'boolean') return resolve(data);
            return resolve(data.data);
        });

    }
};

module.exports = {
    Unicron,
    token,
};