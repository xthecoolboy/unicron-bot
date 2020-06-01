
const { UserProfile } = require('../../database/database');
const Base = require('../../classes/Base');

const removeElement = function (arr, key) {
    return arr.filter((item) => { return item !== key });
}

class Badges extends Base {
    constructor(id) {
        super(id);
    }
    add(badge) {
        return new Promise(async (resolve, reject) => {
            const [user,] = await UserProfile.findOrCreate({ where: { user_id: this.id } });
            if (!user.data) user.data = {};
            const copy = user.data;
            if (copy['badges'] && copy['badges'].includes(badge)) return resolve(false);
            (copy['badges'] || (copy['badges'] = [])).push(badge);
            await UserProfile.update({ data: copy }, { where: { user_id: this.id } });
            return resolve(true);
        });
    }
    remove(badge) {
        return new Promise(async (resolve, reject) => {
            const [user,] = await UserProfile.findOrCreate({ where: { user_id: this.id } });
            if (!user.data) user.data = {};
            if (user.data['badges'] && !user.data['badges'].includes(badge)) return resolve(false);
            const mcpy = removeElement(user.data['badges'], badge);
            user.data['badges'] = mcpy;
            await UserProfile.update({ data: user.data }, { where: { user_id: this.id } });
            return resolve(true);
        });
    }

    has(value) {
        return new Promise(async (resolve, reject) => {
            const [user,] = await UserProfile.findOrCreate({ where: { user_id: this.id } });
            if (!user.data) user.data = {};
            if (!user.data['badges']) user.data['badges'];
            user.save();
            return resolve(user.data['badges'].includes(value) ? true : false);
        });
    }
    fetch() {
        return new Promise(async (resolve, reject) => {
            const [user,] = await UserProfile.findOrCreate({ where: { user_id: this.id } });
            if (!user.data) user.data = {};
            return resolve(user.data['badges'] ? user.data['badges'] : []);
        });

    }
};

module.exports = Badges;