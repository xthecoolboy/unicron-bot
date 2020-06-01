
const { UserInventory } = require('../../database/database');
const Base = require('../../classes/Base');

class Inventory extends Base {
    constructor(id) {
        super(id);
    }
    add(item) {
        return new Promise(async (resolve, reject) => {
            const [useritem,] = await UserInventory.findOrCreate({ where: { user_id: this.id, item_id: item } });
            useritem.amount += 1;
            useritem.save();
            return resolve(true);
        });
    }
    remove(item) {
        return new Promise(async (resolve, reject) => {
            const useritem = await UserInventory.findOne({ where: { user_id: this.id, item_id: item } });
            if (!useritem) return resolve(true);
            if (useritem.amount === 1) return resolve(UserInventory.destroy({ where: { user_id: this.id, item_id: item } }));
            useritem.amount -= 1;
            useritem.save();
            return resolve(true);
        });

    }
    has(item) {
        return new Promise(async (resolve, reject) => {
            const useritem = await UserInventory.findOne({ where: { user_id: this.id, item_id: item } });
            if (!useritem) return resolve(0);
            return resolve(useritem.amount);
        });
    }
    fetch() {
        return new Promise(async (resolve, reject) => {
            const items = await UserInventory.findAll({ where: { user_id: this.id } });
            return resolve(items ? items : []);
        });
    }
    destroy() {
        UserInventory.destroy({ where: { user_id: this.id } });
    }
};

module.exports = Inventory;