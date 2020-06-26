const Discord = require('discord.js');
const Client = require('../classes/Unicron');
const BaseEvent = require('../classes/BaseEvent');

module.exports = class extends BaseEvent {
    constructor() {
        super('guildDelete');
    }
    /**
     * @param {Client} client
     * @param {Discord.Guild} guild
     */
    async run(client, guild) {
        const channel = await client.channels.fetch(client.unicron.channel, false);
        try {
            const g = await client.database.guilds.fetch(guild.id, false);
            await g.destroy(true, true);
        } catch (err) {
            console.log(err);
        }
        channel.send(`Unicron left \`${guild.name}\``);
        client.shard.broadcastEval(`
            this.user.setPresence({
                activity: {
                    name: \`${await client.getCount('guilds')} guilds! | ?help\`,
                    type: 'LISTENING',
                },
                status: 'online',
            });
        `);
    }
}