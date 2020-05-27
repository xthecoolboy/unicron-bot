
const {
    UserProfile,
    UserInventory,
} = require('../database/database');

const Leveling = require('../modules/Leveling');
const { Random } = require('../utils/');
const { MessageEmbed } = require('discord.js');

const Base = require('../classes/Base');

const Coin = require('./User/Coin');
const Badge = require('./User/Badge');
const Inventory = require('./User/Inventory');
const Experience = require('./User/Experience');

class User extends Base {
    constructor(id) {
        super(id);
        this.badges = new Badge(id);
        this.inventory = new Inventory(id);
        this.coins = new Coin(id);
        this.experience = new Experience(id);
    }
    /**
     * @brief Destroy data
     */
    destroy() {
        UserProfile.destroy({ where: { user_id: this.id } });
        this.inventory.destroy();
    }
    async profile(value) {
        const [retval,] = await UserProfile.findOrCreate({ where: { user_id: this.id } });
        return retval[value];
    }
    async getLevel() {
        let lvl = 0;
        const cur = await this.getExperience();
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
        return await this.getLevel() + 1
    }
    async getNextLevelXP() {
        return Leveling.LevelChart[await this.getNextLevel()];
    }
    async getPercentageProgressToNextLevel() {
        return ((await this.getExperience() - await this.getLevelXP()) /
            (await this.getNextLevelXP() - await this.getLevelXP())) * 100; // (xp - lxp / nxp - lxp) * 100 = n
    };
    async getRequiredExpToNextLevel() {
        return await this.getNextLevelXP() - await this.getExperience();
    }
    async levelup(client, message, exp) {
        const next_level = await this.getNextLevel();
        let current_level = await this.getLevel();
        await this.addExperience(exp || Random.nextInt({ max: 15, min: 5}));
        current_level = await this.getLevel();
        if (current_level === next_level) {
            const prize = Leveling.RequiredLevelChart[current_level];
            this.addCoins(prize);
            return message.channel.send(new MessageEmbed()
                .setColor('0x00FFFF')
                .setTitle(':arrow_up:   **LEVELUP**   :arrow_up:')
                .setDescription(`GG, You levelup from **${current_level - 1}** ${await client.getEmoji('join_arrow','system')} **${current_level}**\nAnd received **${prize}**💰 coins!`)
                .setFooter(`${message.author.tag}`)
            );
        }
    }
}

module.exports = User;