const { GuildSettings } = require('../database/database');
const BaseManager = require('../classes/BaseManager');
const Guild = require('../classes/Guild');
const ms = require('pretty-ms');

module.exports = class GuildManager extends BaseManager {
    constructor(client, options) {
        super(client, options);
    }
    /**
     * @brief Caches all guild data from the database (Limit: 100)
     */
    startInterval() {
        this.client.setInterval(async () => {
            const guilds = await GuildSettings.findAll();
            this.client.logger.info(`Clearing Guild Database cache...`);
            let count = 0;
            const now = Date.now();
            for (const data of guilds) {
                if (!this.client.guilds.cache.has(data.guild_id)) {
                    this.cache.delete(data.guild_id);
                    count++;
                }
            }
            this.client.logger.info(`Cleared ${count} guilds in ${ms(Date.now() - now)}`);
        }, 60000 * 10);
    }
    /**
     * @param {String} guild_id 
     * @returns {Promise<Guild>}
     */
    fetch(guild_id) {
        return new Promise(async (resolve, reject) => {
            if (this.cache.has(guild_id)) return resolve(this.cache.get(guild_id));
            const instance = new Guild(guild_id);
            this.cache.set(instance.id, instance);
            return resolve(instance);
        });
    }
}