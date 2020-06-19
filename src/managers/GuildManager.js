const { GuildSettings } = require('../database/database');
const BaseManager = require('../classes/BaseManager');
const Guild = require('../classes/Guild');

module.exports = class GuildManager extends BaseManager {
    constructor(client, options) {
        super(client, options);
    }
    /**
     * @brief Caches all guild data from the database (Limit: 100)
     */
    async sync() {
        const users = await GuildSettings.findAll();
        this.client.setInterval(() => {
            for (const data of users) {
                if (!this.client.guilds.cache.has(data.user_id)) {
                    this.cache.delete(data.user_id);
                    continue;
                }
                const instance = new Guild(data.user_id, data);
                this.cache.set(instance.id, instance);
            }
        }, 60000 * 10);
    }
    /**
     * @param {String} guild_id 
     * @returns {Promise<Guild>}
     */
    fetch(guild_id) {
        return new Promise(async(resolve, reject) => {
            if (this.cache.has(guild_id)) return resolve(this.cache.get(guild_id));
            let data = await GuildSettings.findOne({ where: { guild_id }});
            if (!data) data = await GuildSettings.create({ guild_id });
            const instance = new Guild(data.guild_id, data);
            this.cache.set(instance.id, instance);
            return resolve(instance);
        });
    }
}