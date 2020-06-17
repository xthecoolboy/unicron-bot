const Base = require('./Base');
const User = require('./User');
const { UserProfile } = require('../database/database');

module.exports = class UserCoin extends Base {
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
     * @returns {Promise<User>}
     * @param {Number} amount 
     */
    add(amount) {
        return new Promise(async (resolve, reject) => {
            let user = await UserProfile.findOne({ where: { user_id: this.id } });
            if (!user) {
                await UserProfile.create({ user_id: this.id, balance: amount });
                return resolve(this.parent);
            }
            user.balance += Number(amount);
            await user.save();
            return resolve(this.parent);
        });
    }
    /**
     * @returns {Promise<User>}
     * @param {Number} amount 
     */
    remove(amount) {
        return new Promise(async (resolve, reject)=> {
            let user = await UserProfile.findOne({ where: { user_id: this.id } });
            if (!user) {
                await UserProfile.create({ user_id: this.id, balance: amount });
                return resolve(this.parent);
            }
            user.balance -= Number(amount);
            await user.save();
            return resolve(this.parent);
        });
    }
    /**
     * @returns {Promise<Number>}
     */
    fetch(){
        return new Promise(async (resolve, reject) => {
            let user = await UserProfile.findOne({ where: { user_id: this.id } });
            if (!user) user = await UserProfile.create({ user_id: this.id });
            return resolve(user ? user.balance : 0);
        });
    }
}