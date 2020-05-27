
const { Admin } = require('../database/database.js');
const { Random } = require('../utils/');

const token = function () {
    return Random.string(32);
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
    async database(table) {
        const [data,] = await Admin.findOrCreate({ where: { table: table } });
        return data.data;
    }
    async model(table) {
        const [model,] = await Admin.findOne({ where: { table: table}});
        return model;
    }
};

module.exports = {
    Unicron,
    token,
};