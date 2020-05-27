
const {
    UserProfile,
    UserInventory,
} = require('../database/database');

const Leveling = require('../modules/Leveling');
const { Random } = require('../utils/');
const { MessageEmbed } = require('discord.js');

const inventoryHelper = {
    add: async function (id, options) {
        const useritem = await UserInventory.findOrCreate({ where: { user_id: id, item_id: options.item } });
        useritem += 1;
        useritem.save();
        return true;
    },
    remove: async function (id, options) {
        const useritem = await UserInventory.findOne({ where: { user_id: id, item_id: options.item } });
        if (!useritem) return;
        if (useritem.amount === 1) return UserInventory.destroy({ where: { user_id: id, item_id: options.item } });
        useritem.amount -= 1;
        useritem.save();
        return true;
    },
    fetch: async function (id, options) {
        const useritem = await UserInventory.findOne({ where: { user_id: id, item_id: options.item } });
        if (!useritem) return false;
        return useritem.amount;
    }
}

class User {
    constructor(_id) {
        this.id = _id;
    }
    /**
     * @brief Destroy data
     */
    destroy() {
        this.inventory({ action: 'reset' });
        UserProfile.destroy({ where: { user_id: this.id } });
    }
    async profile(value) {
        const [retval,] = await UserProfile.findOrCreate({ where: { user_id: this.id } });
        return retval[value];
    }
    async addCoins(amount = 0) {
        let user = await UserProfile.findOne({ where: { user_id: this.id } });
        if (!user) {
            return UserProfile.create({ user_id: this.id, balance: amount });
        }
        user.balance += Number(amount);
        return user.save();
    }
    async getBalance() {
        const user = await UserProfile.findOne({ where: { user_id: this.id } });
        return user ? user.balance : 0;
    }
    async addExperience(amount = 0) {
        let user = await UserProfile.findOne({ where: { user_id: this.id } });
        if (!user) {
            return UserProfile.create({ user_id: this.id, experience: amount });
        }
        user.experience += Number(amount);
        return user.save();
    }
    async getExperience() {
        const user = await UserProfile.findOne({ where: { user_id: this.id } });
        return user ? user.experience : 0;
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
    /**
     * 
     * @param {JSON} options Options
     * 
     * Actions:
     * * add
     * * remove
     * * fetch
     * * reset
     * 
     * ```js
     * // Examples
     * const status = await message.author.db.inventory({ action: 'add', item: 'newItem'});
     * const status = await message.author.db.inventory({ action: 'remove', item: 'removeItem'});
     * const nums = await message.author.db.invenoty({ action: 'fetch', item: 'hasItem'});
     * const items = await message.author.db.inventory();
     * ```
     */
    async inventory(options) {
        if (options.action) {
            if (options.action === 'reset') {
                await UserInventory.destroy({ where: { user_id: this.id } });
                return true;
            } else {
                return inventoryHelper[options.action](this.id, options);
            }
        }
        return await UserInventory.findAll({ where: { user_id: this.id } });
    }
}

module.exports = User;