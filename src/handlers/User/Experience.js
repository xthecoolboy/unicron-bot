
const { UserProfile } = require('../../database/database');
const Base = require('../../classes/Base');

const Leveling = require('../../modules/Leveling');

class Experience extends Base {
    constructor(id) {
        super(id);
    }
    async add(amount = 0) {
        let user = await UserProfile.findOne({ where: { user_id: this.id } });
        if (!user) {
            return UserProfile.create({ user_id: this.id, experience: amount });
        }
        user.experience += Number(amount);
        return user.save();
    }
    async remove(amount = 0) {
        let user = await UserProfile.findOne({ where: { user_id: this.id } });
        if (!user) {
            return UserProfile.create({ user_id: this.id, experience: amount });
        }
        user.experience -= Number(amount);
        return user.save();
    }
    async fetch() {
        const user = await UserProfile.findOne({ where: { user_id: this.id } });
        return user ? user.experience : 0;
    }
    async getLevel() {
        let lvl = 0;
        const cur = await this.fetch();
        for (let i = 0; i < 101; i++) {
            lvl = i;
            if (cur >= Leveling.LevelChart[i] && cur <= Leveling.LevelChart[i + 1])
                break;
        }
        return lvl;
    }
    async getLevelXP() {
        return Leveling.LevelChart[await this.getLevel()];
    }
    async getNextLevel() {
        return await this.getLevel() + 1;
    }
    async getNextLevelXP() {
        return Leveling.LevelChart[await this.getNextLevel()];
    }
    async getProgressBar() {
        return Leveling.ProgressBar(this.getPercentageProgressToNextLevel);
    }
    async getPercentageProgressToNextLevel() {
        return ((await this.getExperience() - await this.getLevelXP()) /
            (await this.getNextLevelXP() - await this.getLevelXP())) * 100; // (xp - lxp / nxp - lxp) * 100 = n
    };
    async getRequiredExpToNextLevel() {
        return await this.getNextLevelXP() - await this.getExperience();
    }
};

module.exports = Experience;