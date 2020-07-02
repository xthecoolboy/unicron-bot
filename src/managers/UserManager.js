const BaseManager = require('../classes/BaseManager');
const User = require('../classes/User');

module.exports = class UserManager extends BaseManager {
    constructor(client, options) {
        super(client, options);
    }
    /**
     * @returns {Promise<User>}
     * @param {String} user_id 
     */
    fetch(user_id) {
        return new Promise(async (resolve, reject) => {
            const instance = new User(user_id);
            return resolve(instance);
        });
    }
}