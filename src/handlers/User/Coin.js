
const { UserProfile } = require('../../database/database');
const Base = require('../../classes/Base');

class Coin extends Base {
    constructor(id) {
        super(id);
    }
    add(amount) {
        return new Promise(async (resolve, reject) => {
            const user = await UserProfile.findOne({ where: { user_id: this.id } });
            if (!user) {
                return resolve(UserProfile.create({ user_id: this.id, balance: amount }));
            }
            user.balance += Number(amount);
            return resolve(user.save());
        });
    }
    remove(amount) {
        return new Promise(async (resolve, reject) => {
            const user = await UserProfile.findOne({ where: { user_id: this.id } });
            if (!user) {
                return resolve(UserProfile.create({ user_id: this.id, balance: amount }));
            }
            user.balance -= Number(amount);
            return resolve(user.save());
        });
    }
    fetch() {
        return new Promise(async (resolve, reject) => {
            const user = await UserProfile.findOne({ where: { user_id: this.id } });
            return resolve(user ? user.balance : 0);
        });

    }
};

module.exports = Coin;