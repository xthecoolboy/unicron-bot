const { UserProfile } = require('../database/database');
const BaseManager = require('../classes/BaseManager');
const User = require('../classes/User');


module.exports = class UserManager extends BaseManager {
    constructor(client, options) {
        super(client, options);
    }
    /**
     * @brief Caches all user data from the database (Limit: 100)
     */
    async sync() {
        const users = await UserProfile.findAll();
        this.client.setInterval(() => {
            for (const data of users) {
                if (!this.client.users.cache.has(data.user_id)) {
                    this.cache.delete(data.user_id);
                    continue;
                }
                const instance = new User(data.user_id, data);
                this.cache.set(instance.id, instance);
            }
        }, 60000 * 10);
    }
    /**
     * @returns {Promise<User>}
     * @param {String} user_id 
     */
    fetch(user_id) {
        return new Promise(async (resolve, reject) => {
            if (this.cache.has(user_id)) return resolve(this.cache.get(user_id));
            let data = await UserProfile.findOne({ where: { user_id } });
            if (!data) data = await UserProfile.create({ user_id });
            const instance = new User(data.user_id, data);
            this.cache.set(instance.id, instance);
            return resolve(instance);
        });
    }
}