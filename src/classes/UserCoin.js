const Base = require('./Base');
const User = require('./User');

module.exports = class UserCoin extends Base {
    /**
     * 
     * @param {User} parent 
     */
    constructor(parent) {
        super(parent.id);
        this.data = parent.data;
    }
    /**
     * @returns {Promise<void>}
     * @param {Number} amount 
     */
    add(amount) {
        return new Promise(async (resolve, reject) => {
            try {
                this.data.balance += Number(amount);
                await this.data.save();
                resolve();
            } catch (e) {
                reject(e);
            }
        });
    }
    /**
     * @returns {Promise<void>}
     * @param {Number} amount 
     */
    remove(amount) {
        return new Promise(async (resolve, reject) => {
            try {
                this.data.balance -= Number(amount);
                await this.data.save();
                resolve();
            } catch (e) {
                reject(e);
            }
        });
    }
    /**
     * @returns {Number}
     */
    fetch() {
        return this.data.balance;
    }
}