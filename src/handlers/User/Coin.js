
const { UserProfile } = require('../../database/database');
const Base = require('../../classes/Base');

class Coin extends Base {
    constructor(id) {
        super(id);
    }
    async add(amount) {
        let user = await UserProfile.findOne({ where: { user_id: this.id } });
        if (!user) {
            return UserProfile.create({ user_id: this.id, balance: amount });
        }
        user.balance += Number(amount);
        return user.save();
    }
    async remove(amount) {
        let user = await UserProfile.findOne({ where: { user_id: this.id } });
        if (!user) {
            return UserProfile.create({ user_id: this.id, balance: amount });
        }
        user.balance -= Number(amount);
        return user.save();
    }
    async fetch() {
        const user = await UserProfile.findOne({ where: { user_id: this.id } });
        return user ? user.balance : 0;
    }
};

module.exports = Coin;