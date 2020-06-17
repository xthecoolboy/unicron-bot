const Base = require('./Base');
const User = require('./User');
const { UserProfile } = require('../database/database');

function removeElement(arr, key) {
    return arr.filter((item) => { return item !== key });
}

module.exports = class UserBadge extends Base {
    /**
     * 
     * @param {User} parent 
     * @param {String} id 
     */
    constructor(parent, id) {
        super(id);
        this.parent = parent;
    }
    /**
     * @returns {Promise<Boolean>}
     * @param {String} badge 
     */
    add(badge) {
        return new Promise(async (resolve, reject) => {
            let user = await UserProfile.findOne({ where: { user_id: this.id } });
            if (!user) user = await UserProfile.create({ user_id: this.id });
            if (!user.data) user.data = {};
            const copy = user.data;
            if (copy['badges'] && copy['badges'].includes(badge)) return resolve(false);
            (copy['badges'] || (copy['badges'] = [])).push(badge);
            await UserProfile.update({ data: copy }, { where: { user_id: this.id } });
            return resolve(true);
        });
    }
    /**
     * @returns {Promise<Boolean>}
     * @param {String} badge 
     */
    remove(badge) {
        return new Promise(async (resolve, reject) => {
            let user = await UserProfile.findOne({ where: { user_id: this.id } });
            if (!user) user = await UserProfile.create({ user_id: this.id });
            if (!user.data) user.data = {};
            if (user.data['badges'] && !user.data['badges'].includes(badge)) return resolve(false);
            const mcpy = removeElement(user.data['badges'], badge);
            user.data['badges'] = mcpy;
            await UserProfile.update({ data: user.data }, { where: { user_id: this.id } });
            return resolve(true);
        });
    }
    /**
     * @returns {Promise<Boolean>}
     * @param {String} badge 
     */
    has(value) {
        return new Promise(async (resolve, reject) => {
            let user = await UserProfile.findOne({ where: { user_id: this.id } });
            if (!user) user = await UserProfile.create({ user_id: this.id });
            if (!user.data) user.data = {};
            if (!user.data['badges']) user.data['badges'] = [];
            await user.save();
            return resolve(user.data['badges'].includes(value) ? true : false);
        });
    }
    /**
     * @returns {Promise<Array<String>>}
     */
    fetch() {
        return new Promise(async (resolve, reject) => {
            let user = await UserProfile.findOne({ where: { user_id: this.id } });
            if (!user) user = await UserProfile.create({ user_id: this.id });
            if (!user.data) user.data = {};
            return resolve(user.data['badges'] ? user.data['badges'] : []);
        });
    }
}