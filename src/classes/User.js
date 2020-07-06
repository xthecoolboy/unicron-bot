const Base = require('./Base');
const { UserProfile } = require('../database/database');
const UserInventory = require('./UserInventory');
const UserCoin = require('./UserCoin');
const UserBadge = require('./UserBadge');
const UserXP = require('./UserXP');

const Leveling = require('../modules/Leveling');
const { Random } = require('../utils/');
const { MessageEmbed, Client, Message } = require('discord.js');

module.exports = class User extends Base {
    /**
     * 
     * @param {string} id 
     * @param {typeof UserProfile} data 
     */
    constructor(id, data) {
        super(id);
        this.data = data;
        this.inventory = new UserInventory(this);
        this.coins = new UserCoin(this);
        this.badges = new UserBadge(this);
        this.experience = new UserXP(this);
    }
    destroy() {
        this.data.destroy();
    }
    /**
     * Searches:
     * - premium
     * - married_id
     * - multiplier
     * - data {Object}
     * @returns {JSON|string|boolean}
     * @param {boolean|string} value 
     */
    profile(value) {
        return typeof value === 'boolean' ? this.data : this.data[value];
    }
    /**
     * @returns {Promise<JSON>}
     */
    async toJSON() {
        return {
            user_id: this.id,
            balance: this.coins.fetch(),
            experience: this.experience.fetch(),
            premium: this.profile('premium'),
            married_id: this.profile('married_id'),
            multiplier: this.profile('multiplier'),
            badges: this.profile('data').badges,
            inventory: (await this.inventory.fetch()).map((v) => { return { id: v.item_id, amount: v.amount } }),
        };
    }
    /**
     * @returns {Promise<Message|boolean>}
     * @param {Client} client 
     * @param {Message} message 
     * @param {number} exp 
     */
    levelup(client, message, exp) {
        return new Promise(async (resolve, reject) => {
            const next_level = this.experience.getNextLevel();
            let current_level = this.experience.getLevel();
            await this.experience.add(exp || Random.nextInt({ max: 12, min: 6 }));
            current_level = this.experience.getLevel();
            if (current_level === next_level) {
                const prize = Leveling.RequiredLevelChart[current_level] * 2;
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