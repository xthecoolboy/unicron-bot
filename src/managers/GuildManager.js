const BaseManager = require('../classes/BaseManager');
const Guild = require('../classes/Guild');

module.exports = class GuildManager extends BaseManager {
    constructor(client, options) {
        super(client, options);
    }
    /**
     * @param {String} guild_id 
     * @returns {Promise<Guild>}
     */
    fetch(guild_id) {
        return new Promise(async (resolve, reject) => {
            const instance = new Guild(guild_id);
            return resolve(instance);
        });
    }
}