const BaseManager = require('../classes/BaseManager');
const User = require('../classes/User');
const { UserProfile } = require('../database/database');

module.exports = class UserManager extends BaseManager {
    /**
     * 
     * @param {Object<string, any>} options 
     */
    constructor(client, options) {
        super(client, options);
    }
    /**
     * @returns {Promise<User>}
     * @param {string} user_id 
     * @param {boolean} cache
     */
    fetch(user_id, cache = false) {
        return new Promise(async (resolve, reject) => {
            try {
                if (this.cache.has(user_id)) return resolve(this.cache.get(user_id));
                let data = await UserProfile.findOne({ where: { user_id }});
                if (!data) data = await UserProfile.create({ user_id });
                const instance = new User(user_id, data);
                if (cache) this.cache.set(user_id, instance);
                return resolve(instance);
            } catch (e) {
                reject(e);
            }
        });
    }
}