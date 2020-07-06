const Base = require('./Base');
const User = require('./User');
const { UserInventory: inv } = require('../database/database');

module.exports = class UserInventory extends Base {
    /**
     * 
     * @param {User} parent 
     */
    constructor(parent) {
        super(parent.id);
    }
    /**
     * @returns {Promise<boolean>}
     * @param {string} item 
     */
    add(item) {
        return new Promise(async (resolve, reject) => {
            try {
                let useritem = await inv.findOne({ where: { user_id: this.id, item_id: item } });
                if (!useritem) {
                    useritem = await inv.create({ user_id: this.id, item_id: item, amount: 1 });
                    return resolve(true);
                }
                useritem.amount += 1;
                useritem.save();
                resolve(true);
            } catch (e) {
                reject(e)
            }
        });
    }
    /**
     * @returns {Promise<boolean>}
     * @param {string} item 
     */
    remove(item) {
        return new Promise(async (resolve, reject) => {
            try {
                const useritem = await inv.findOne({ where: { user_id: this.id, item_id: item } });
                if (!useritem) return resolve(true);
                if (useritem.amount === 1) {
                    await inv.destroy({ where: { user_id: this.id, item_id: item } })
                    return resolve(true);
                }
                useritem.amount -= 1;
                useritem.save();
                return resolve(true);
            } catch (e) {
                reject(e);
            }
        });

    }
    /**
     * @returns {Promise<number>}
     * @param {string} item 
     */
    has(item) {
        return new Promise(async (resolve, reject) => {
            try {
                const useritem = await inv.findOne({ where: { user_id: this.id, item_id: item } });
                if (!useritem) return resolve(0);
                return resolve(useritem.amount);
            } catch (e) {
                reject(e);
            }
        });
    }
    /**
     * @returns {Promise<Array<JSON>>}
     */
    fetch() {
        return new Promise(async (resolve, reject) => {
            try {
                const items = await inv.findAll({ where: { user_id: this.id } });
                return resolve(items ? items : []);
            } catch (e) {
                reject(e);
            }
        });
    }
    async destroy() {
        await inv.destroy({ where: { user_id: this.id } }).catch((e) => { throw e });
    }
}