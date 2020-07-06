const { Model } = require('sequelize');
const { Admin } = require('../database/database.js');

module.exports = class Unicron {
    /**
     * 
     * @param {Object} options Options
     * @param {Map<string, Model>} data
     */
    constructor(options, data = new Map()) {
        this.owner = options.owner;
        this.server = options.server;
        this.serverInviteURL = options.inviteURL;
        this.channel = options.channel;
        this.modChannel = options.modChannel;
        this.host = options.hostURL;
        this.data = data;
    }
    /**
     * @returns {JSON|Model}
     * @param {string} table 
     * @param {boolean} model if true, returns the actuall model instance
     */
    database(table, model = false) {
        return new Promise(async (resolve, reject) => {
            if (this.data.has(table)) return resolve(model ? this.data.get(table): this.data.get(table).data);
            let data = await Admin.findOne({ where: { table: table } });
            if (!data) data = await Admin.create({ table });
            this.data.set(table, data);
            return resolve(model ? this.data.get(table): this.data.get(table).data);
        });
    }
};