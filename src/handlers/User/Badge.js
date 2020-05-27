
const { UserProfile } = require('../../database/database');
const Base = require('../../classes/Base');

class Badges extends Base {
    constructor(id) {
        super(id);
    }
    async add(badge) {
        const [user,] = await UserProfile.findOrCreate({ where: { user_id: this.id } });
        if (!user.data) user.data = {};
        const copy = user.data;
        if (copy['badges'].has(badge)) return false;
        (copy['badges'] || (copy['badges'] = [])).push(badge);
        user.data = copy;
        user.save();
        return true;
    }
    async remove(badge) {
        const [user,] = await UserProfile.findOrCreate({ where: { user_id: this.id } });
        if (!user.data) user.data = {};
        const copy = user.data;
        if (!copy['badges'] || !copy['badges'].has(badge)) return false;
        user.data = copy['badges'].filter((item) => {
            return item !== badge;
        });
        user.save();
        return true;
    }
    async has(value) {
        const [user,] = await UserProfile.findOrCreate({ where: { user_id: this.id } });
        if (!user.data) user.data = {};
        if (!user.data['badges']) user.data['badges'];
        user.save();
        return user.data['badges'].has(value);
    }
    async fetch() {
        const [user,] = await UserProfile.findOrCreate({ where: { user_id: this.id } });
        if (!user.data) user.data = {};
        return user.data['badges'] ? user.data['badges'] : [];
    }
};

module.exports = Badges;