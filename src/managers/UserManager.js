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
        /** 
        if (this.options.maximumCacheSize) {
            for (let i = 0; i < this.options.maximumCacheSize; i++) {
                const data = users[i];
                const instance = new User(data.user_id, data);
                this.cache.set(instance.id, instance);
            }
            return;
        }
         */
        for (const data of users) {
            const instance = new User(data.user_id, data);
            this.cache.set(instance.id, instance);
        }
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