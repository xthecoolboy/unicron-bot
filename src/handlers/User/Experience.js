
const { UserProfile } = require('../../database/database');
const Base = require('../../classes/Base');

class Experience extends Base {
    constructor(id) {
        super(id);
    }
    add(amount = 0) {
        let user = await UserProfile.findOne({ where: { user_id: this.id } });
        if (!user) {
            return UserProfile.create({ user_id: this.id, experience: amount });
        }
        user.experience += Number(amount);
        return user.save();
    }
    remove(amount = 0) {
        let user = await UserProfile.findOne({ where: { user_id: this.id } });
        if (!user) {
            return UserProfile.create({ user_id: this.id, experience: amount });
        }
        user.experience -= Number(amount);
        return user.save();
    }
    fetch() {
        const user = await UserProfile.findOne({ where: { user_id: this.id } });
        return user ? user.experience : 0;
    }
};

module.exports = Experience;