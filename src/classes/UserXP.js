const Base = require('./Base');
const User = require('./User');
const { UserProfile } = require('../database/database');
const Leveling = require('../modules/Leveling');

module.exports = class UserXP extends Base {
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
     * @returns {Promise<User>}
     * @param {Number} amount 
     */
    add(amount) {
        return new Promise(async (resolve, reject) => {
            let user = await UserProfile.findOne({ where: { user_id: this.id } });
            if (!user) {
                await UserProfile.create({ user_id: this.id, experience: amount });
                return resolve(this.parent);
            }
            user.experience += Number(amount);
            await user.save();
            return resolve(this.parent);
        });
    }
    /**
     * @returns {Promise<User>}
     * @param {Number} amount 
     */
    remove(amount) {
        return new Promise(async (resolve, reject)=> {
            let user = await UserProfile.findOne({ where: { user_id: this.id } });
            if (!user) {
                await UserProfile.create({ user_id: this.id, experience: amount });
                return resolve(this.parent);
            }
            user.experience -= Number(amount);
            await user.save();
            return resolve(this.parent);
        });
    }
    /**
     * @returns {Promise<Number>}
     */
    fetch(){
        return new Promise(async (resolve, reject) => {
            let user = await UserProfile.findOne({ where: { user_id: this.id } });
            if (!user) user = await UserProfile.create({ user_id: this.id });
            return resolve(user ? user.experience : 0);
        });
    }
    /**
     * @returns {Promise<Number>}
     */
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
    /**
     * @returns {Promise<Number>}
     */
    getLevelXP() {
        return new Promise(async (resolve, reject) => {
            return resolve(Leveling.LevelChart[await this.getLevel()]);
        });
    }
    /**
     * @returns {Promise<Number>}
     */
    getNextLevel() {
        return new Promise(async (resolve, reject) => {
            return resolve(await this.getLevel() + 1);
        });
    }
    /**
     * @returns {Promise<Number>}
     */
    getNextLevelXP() {
        return new Promise(async (resolve, reject) => {
            return resolve(Leveling.LevelChart[await this.getNextLevel()]);
        });

    }
    /**
     * @returns {Promise<String>}
     */
    getProgressBar() {
        return new Promise(async (resolve, reject) => {
            return resolve(Leveling.ProgressBar(await this.getPercentageProgressToNextLevel()));
        });
    }
    /**
     * @returns {Promise<Number>}
     */
    getPercentageProgressToNextLevel() {
        return new Promise(async (resolve, reject) => {
            return resolve(((await this.fetch() - await this.getLevelXP()) /
                (await this.getNextLevelXP() - await this.getLevelXP())) * 100); // (xp - lxp / nxp - lxp) * 100 = n
        });

    };
    /**
     * @returns {Promise<Number>}
     */
    getRequiredExpToNextLevel() {
        return new Promise(async (resolve, reject) => {
            return resolve(await this.getNextLevelXP() - await this.fetch());
        });
    }
}