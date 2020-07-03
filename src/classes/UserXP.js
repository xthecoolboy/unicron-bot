const Base = require('./Base');
const User = require('./User');
const Leveling = require('../modules/Leveling');

module.exports = class UserXP extends Base {
    /**
     * 
     * @param {User} parent 
     */
    constructor(parent) {
        super(parent.id);
        this.data = parent.data;
    }
    /**
     * @returns {Promise<User>}
     * @param {Number} amount 
     */
    add(amount) {
        return new Promise(async (resolve, reject) => {
            try {
                this.data.experience += Number(amount);
                await this.data.save();
                resolve();
            } catch (e) {
                reject(e);
            }
        });
    }
    /**
     * @returns {Promise<User>}
     * @param {Number} amount 
     */
    remove(amount) {
        return new Promise(async (resolve, reject) => {
            try {
                this.data.experience -= Number(amount);
                await this.data.save();
                resolve();
            } catch (e) {
                reject(e);
            }
        });
    }
    /**
     * @returns {Number}
     */
    fetch() {
        return this.data.experience;
    }
    /**
     * @returns {Number}
     */
    getLevel() {
        let lvl = 0;
        const cur = this.data.experience;
        for (let i = 0; i < 101; i++) {
            lvl = i;
            if (cur >= Leveling.LevelChart[i] && cur <= Leveling.LevelChart[i + 1])
                break;
        }
        return lvl;
    }
    /**
     * @returns {Number}
     */
    getLevelXP() {
        return Leveling.LevelChart[this.getLevel()];
    }
    /**
     * @returns {Number}
     */
    getNextLevel() {
        return this.getLevel() + 1;
    }
    /**
     * @returns {Number}
     */
    getNextLevelXP() {
        return Leveling.LevelChart[this.getNextLevel()];
    }
    /**
     * @returns {String}
     */
    getProgressBar() {
        return Leveling.ProgressBar(this.getPercentageProgressToNextLevel());
    }
    /**
     * @returns {Number}
     */
    getPercentageProgressToNextLevel() {
        return ((this.data.experience - this.getLevelXP()) /
            (this.getNextLevelXP() - this.getLevelXP())) * 100; // (xp - lxp / nxp - lxp) * 100 = n

    };
    /**
     * @returns {Number}
     */
    getRequiredExpToNextLevel() {
        return this.getNextLevelXP() - this.data.experience;
    }
}