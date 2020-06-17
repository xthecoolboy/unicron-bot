const Base = require('./Base');
const User = require('./User');
const { UserInventory: inv } = require('../database/database');

module.exports = class UserInventory extends Base {
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
     * @param {String} item 
     */
    add(item) {
        return new Promise(async (resolve, reject) => {
            let useritem = await inv.findOne({ where: { user_id: this.id, item_id: item } });
            if (!useritem) {
                useritem = await inv.create({ user_id: this.id, item_id: item, amount: 1 });
                return resolve(true);
            }
            useritem.amount += 1;
            useritem.save();
            return resolve(true);
        });
    }
    /**
     * @returns {Promise<Boolean>}
     * @param {String} item 
     */
    remove(item) {
        return new Promise(async (resolve, reject) => {
            const useritem = await inv.findOne({ where: { user_id: this.id, item_id: item } });
            if (!useritem) return resolve(true);
            if (useritem.amount === 1) {
                await inv.destroy({ where: { user_id: this.id, item_id: item } })
                return resolve(true);
            }
            useritem.amount -= 1;
            useritem.save();
            return resolve(true);
        });

    }
    /**
     * @returns {Promise<Number>}
     * @param {String} item 
     */
    has(item) {
        return new Promise(async (resolve, reject) => {
            const useritem = await inv.findOne({ where: { user_id: this.id, item_id: item } });
            if (!useritem) return resolve(0);
            return resolve(useritem.amount);
        });
    }
    /**
     * @returns {Promise<Array<JSON>>}
     */
    fetch() {
        return new Promise(async (resolve, reject) => {
            const items = await inv.findAll({ where: { user_id: this.id } });
            return resolve(items ? items : []);
        });
    }
    async destroy() {
        await inv.destroy({ where: { user_id: this.id } }).catch((e) => { throw e });
    }
}