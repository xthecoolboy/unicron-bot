
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
        let data = await Admin.findOne({ where: { table: table } });
        if (!data) data = await Admin.create({ table: table });
        return data.data;
    }
    async model(table) {
        let model = await Admin.findOne({ where: { table: table}});
        if (!model) model = await Admin.create({ table: table});
        return model;
    }
};

module.exports = {
    Unicron,
    token,
};