
const Endpoint = require('../classes/Endpoint');
const Authorization = require('../auth/Guild');
const { Regex } = require('../../utils');
const GuildStats = require('../../classes/Guild');

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
} = require('../../database/database');

class Guild extends Endpoint {
    constructor(app) {
        super('/api/v1/guild', app);
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
    createRoute() {
        this.route.use(Authorization);
        this.route.get('/:id', async (req, res) => {
            const guild_id = req.params.id;
            if (!guild_id) return res.status(400).send({ message: 'Missing Parameters for /guild/:id' });
            if (!Regex.discord.snowflake.test(guild_id)) return res.status(400).send({ message: `'${guild_id}' is not a snowflake` });
            const datas = await GuildSettings.findOne({ where: { guild_id } });
            if (!datas) return res.status(404).send({ message: `'${guild_id}' does not exist in the database` });
            const data = new Map();
            for await (const model of Object.keys(this.models)) {
                const value = await this.findOrCreate(this.models[model], guild_id);
                data.set(model, value);
            }
            const instance = new GuildStats(guild_id, data);
            res.status(200).send(await instance.toJSON());
        });
        return this.route;
    }
}

module.exports = Guild;