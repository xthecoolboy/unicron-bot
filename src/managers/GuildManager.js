const BaseManager = require('../classes/BaseManager');
const Client = require('../classes/Unicron');
const Guild = require('../classes/Guild');
const {
    GuildDynamicVoice,
    GuildFilter,
    GuildLeave,
    GuildMember,
    GuildModeration,
    GuildSettings,
    GuildTags,
    GuildTicket,
    GuildVerification,
    GuildWelcome,
} = require('../database/database');

module.exports = class GuildManager extends BaseManager {
    /**
     * 
     * @param {Client} client 
     * @param {Object<string, any>} options 
     */
    constructor(client, options) {
        super(client, options);
        this.models = {
            GuildDynamicVoice,
            GuildFilter,
            GuildLeave,
            GuildMember,
            GuildModeration,
            GuildSettings,
            GuildTags,
            GuildTicket,
            GuildVerification,
            GuildWelcome,
        }
    }
    /**
     * 
     * @returns {Promise<Model>}
     * @param {typeof GuildSettings} model 
     * @param {string} guild_id 
     */
    findOrCreate(model, guild_id) {
        return new Promise(async (resolve, reject) => {
            try {
                let data = await model.findOne({ where: { guild_id } });
                if (!data) data = await model.create({ guild_id });
                return resolve(data);
            } catch (e) {
                reject(e)
            }
        });
    }
    /**
     * @param {string} guild_id 
     * @param {boolean} cache
     * @returns {Promise<Guild>}
     */
    fetch(guild_id, cache = false) {
        return new Promise(async (resolve, reject) => {
            try {
                if (this.cache.has(guild_id)) return resolve(this.cache.get(guild_id));
                const data = new Map();
                for await (const model of Object.keys(this.models)) {
                    const value = await this.findOrCreate(this.models[model], guild_id);
                    data.set(model, value);
                }
                const instance = new Guild(guild_id, data);
                if (cache) this.cache.set(guild_id, instance);
                return resolve(instance);
            } catch (e) {
                reject(e);
            }
        });
    }
}