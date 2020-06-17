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
     * @param {String} id 
     * @param {UserProfile} data 
     */
    constructor(id, data) {
        super(id);
        this.data = data;
        this.inventory = new UserInventory(this, id);
        this.coins = new UserCoin(this, id);
        this.badges = new UserBadge(this, id);
        this.experience = new UserXP(this, id);
    }
    async destroy() {
        await UserProfile.destroy({ where: { user_id: this.id } }).catch((e) => { throw e });
    }
    /**
     * Searches:
     * - premium
     * - data {Object}
     * @returns {Promise<Object>|Promise<String>|Promise<JSON>|Promise<Boolean>}
     * @param {Boolean|String} value 
     */
    profile(value) {
        return new Promise(async (resolve, reject) => {
            try {
                if (typeof value === 'boolean') return resolve(this.data);
                return resolve(this.data[value]);
            } catch (e) {
                reject(e);
            }
        });
    }
    save(data) {
        return new Promise(async (resolve, reject)=> {
            try {
                const bb = await data.save();
                this.data = bb;
                resolve(true);
            } catch (error) {
                
            }
        });
    }
    /**
     * @returns {Promise<Message|Boolean>}
     * @param {Client} client 
     * @param {Message} message 
     * @param {Number} exp 
     */
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