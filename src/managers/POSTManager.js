const BaseManager = require('../classes/BaseManager');
const fetch = require('node-fetch');
const { BotLists } = require('../utils/Constants');
const UnicronClient = require('../classes/Unicron');

module.exports = class POSTManager extends BaseManager {
    /**
     * 
     * @param {UnicronClient} client 
     * @param {Object<string, any>} options 
     */
    constructor(client, options) {
        super(client, options);
    }

    async startInterval() {
        const services = Object.keys(BotLists);
         for (let service of services) {
                service = BotLists[service];
                const server_count = await this.client.getCount('guilds');
                const shard_count = this.client.shard.count;
                const member_count = await this.client.getCount('users');
                await this.post({ service, server_count, shard_count, member_count });
            }
        setInterval(async () => {
            for (let service of services) {
                service = BotLists[service];
                const server_count = await this.client.getCount('guilds');
                const shard_count = this.client.shard.count;
                const member_count = await this.client.getCount('users');
                await this.post({ service, server_count, shard_count, member_count });
            }
        }, 60000 * 30);
    }

    /**
     * @private
     * @param {Object} options 
     * @param {Object} options.service
     * @param {string} options.service.token
     * @param {string} options.service.endpoint
     * @param {Function} options.service.parse
     * @param {number} options.server_count
     * @param {number} options.shard_count
     * @param {number} options.member_count
     */
    async post(options) {
        if (!options.service || !options.service.token) return;
        try {
            const url = options.service.endpoint.replace(/:id/g, this.client.user.id);
            const response = await fetch.default(url,
                {
                    method: 'POST',
                    headers: {
                        Authorization: options.service.token,
                        'Content-type': 'application/json',
                        'User-Agent': 'Unicron LLC'
                    },
                    body: JSON.stringify(options.service.parse(options.server_count, options.shard_count, options.member_count)),
                }
            );
            this.client.logger.info(`${url}: Status (${response.status})`);
        } catch (e) {
            this.client.logger.error(`${options.service.endpoint}: ${e.message}`);
        }
    }
}