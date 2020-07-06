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
     * @param {number} amount 
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
     * @param {number} amount 
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
     * @returns {number}
     */
    fetch() {
        return this.data.experience;
    }
    /**
     * @returns {number}
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
     * @returns {number}
     */
    getLevelXP() {
        return Leveling.LevelChart[this.getLevel()];
    }
    /**
     * @returns {number}
     */
    getNextLevel() {
        return this.getLevel() + 1;
    }
    /**
     * @returns {number}
     */
    getNextLevelXP() {
        return Leveling.LevelChart[this.getNextLevel()];
    }
    /**
     * @returns {string}
     */
    getProgressBar() {
        return Leveling.ProgressBar(this.getPercentageProgressToNextLevel());
    }
    /**
     * @returns {number}
     */
    getPercentageProgressToNextLevel() {
        return ((this.data.experience - this.getLevelXP()) /
            (this.getNextLevelXP() - this.getLevelXP())) * 100; // (xp - lxp / nxp - lxp) * 100 = n

    };
    /**
     * @returns {number}
     */
    getRequiredExpToNextLevel() {
        return this.getNextLevelXP() - this.data.experience;
    }
}