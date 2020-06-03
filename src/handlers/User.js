
const { UserProfile } = require('../database/database');

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
        this.coins = new Coin(id);
        this.experience = new Experience(id);
        this.inventory = new Inventory(id);
    }
    /**
     * @brief Destroy data
     */
    async destroy() {
        await UserProfile.destroy({ where: { user_id: this.id } });
        this.inventory.destroy();
    }
    /**
     * Searches
     * * premium
     * * data (JSON OBJECT)
     * @param {String|Boolean} value 
     */
    profile(value) {
        return new Promise(async (resolve, reject) => {
            let retval = await UserProfile.findOne({ where: { user_id: this.id } });
            if (!retval) retval = await UserProfile.create({ guild_id: this.id });
            if (typeof value === 'boolean') {
                return resolve(retval);
            }
            return resolve(retval[value]);
        });
    }
    levelup(client, message, exp) {
        return new Promise(async (resolve, reject) => {
            const next_level = await this.experience.getNextLevel();
            let current_level = await this.experience.getLevel();
            await this.experience.add(exp || Random.nextInt({ max: 12, min: 6 }));
            current_level = await this.experience.getLevel();
            if (current_level === next_level) {
                const prize = Leveling.RequiredLevelChart[current_level];
                this.coins.add(prize);
                return resolve(message.channel.send(new MessageEmbed()
                    .setColor('0x00FFFF')
                    .setTitle(':arrow_up:   **LEVELUP**   :arrow_up:')
                    .setDescription(`GG, You levelup from **${current_level - 1}** ${await client.getEmoji('join_arrow', 'system')} **${current_level}**\nAnd received **${prize}**💰 coins!`)
                    .setFooter(`${message.author.tag}`)
                ));
            }
            return resolve(false);
        });

    }
}

module.exports = User;