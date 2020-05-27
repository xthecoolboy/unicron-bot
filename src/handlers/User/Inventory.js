
const { UserInventory } = require('../../database/database');
const Base = require('../../classes/Base');

class Inventory extends Base {
    constructor(id) {
        super(id);
    }
    async add(item) {
        const [useritem,] = await UserInventory.findOrCreate({ where: { user_id: this.id, item_id: item } });
        useritem += 1;
        useritem.save();
        return true;
    }
    async remove(item) {
        const useritem = await UserInventory.findOne({ where: { user_id: this.id, item_id: item } });
        if (!useritem) return;
        if (useritem.amount === 1) return UserInventory.destroy({ where: { user_id: this.id, item_id: item } });
        useritem.amount -= 1;
        useritem.save();
        return true;
    }
    async has(item) {
        const useritem = await UserInventory.findOne({ where: { user_id: this.id, item_id: item } });
        if (!useritem) return 0;
        return useritem.amount;
    }
    async fetch() {
        const items = await UserInventory.findAll({ where: { user_id: this.id }});
        return items ? items : [];
    }
    destroy() {
        UserInventory.destroy({ where: { user_id: this.id } });
    }
};

module.exports = Inventory;