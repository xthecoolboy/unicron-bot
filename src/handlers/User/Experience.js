
const { UserProfile } = require('../../database/database');
const Base = require('../../classes/Base');

const Leveling = require('../../modules/Leveling');

class Experience extends Base {
    constructor(id) {
        super(id);
    }
    add(amount = 0) {
        return new Promise(async (resolve, reject) => {
            const user = await UserProfile.findOne({ where: { user_id: this.id } });
            if (!user) {
                return resolve(UserProfile.create({ user_id: this.id, experience: amount }));
            }
            user.experience += Number(amount);
            return resolve(user.save());
        });

    }
    remove(amount = 0) {
        return new Promise(async (resolve, reject) => {
            const user = await UserProfile.findOne({ where: { user_id: this.id } });
            if (!user) {
                return resolve(UserProfile.create({ user_id: this.id, experience: amount }));
            }
            user.experience -= Number(amount);
            return resolve(user.save());
        });
    }
    fetch() {
        return new Promise(async (resolve, reject) => {
            const user = await UserProfile.findOne({ where: { user_id: this.id } });
            return resolve(user ? user.experience : 0);
        });
    }
    getLevel() {
        return new Promise(async (resolve, reject) => {
            let lvl = 0;
            const cur = await this.fetch();
            for (let i = 0; i < 101; i++) {
                lvl = i;
                if (cur >= Leveling.LevelChart[i] && cur <= Leveling.LevelChart[i + 1])
                    break;
            }
            return resolve(lvl);
        });
    }
    getLevelXP() {
        return new Promise(async (resolve, reject) => {
            return resolve(Leveling.LevelChart[await this.getLevel()]);
        });
    }
    getNextLevel() {
        return new Promise(async (resolve, reject) => {
            return resolve(await this.getLevel() + 1);
        });
    }
    getNextLevelXP() {
        return new Promise(async (resolve, reject) => {
            return resolve(Leveling.LevelChart[await this.getNextLevel()]);
        });

    }
    getProgressBar() {
        return new Promise(async (resolve, reject) => {
            return resolve(Leveling.ProgressBar(await this.getPercentageProgressToNextLevel()));
        });
    }
    getPercentageProgressToNextLevel() {
        return new Promise(async (resolve, reject) => {
            return resolve(((await this.fetch() - await this.getLevelXP()) /
                (await this.getNextLevelXP() - await this.getLevelXP())) * 100); // (xp - lxp / nxp - lxp) * 100 = n
        });

    };
    getRequiredExpToNextLevel() {
        return new Promise(async (resolve, reject) => {
            return await this.getNextLevelXP() - await this.fetch();
        });
    }
};

module.exports = Experience;