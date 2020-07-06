
const { Message } = require('discord.js');
const Client = require('../../classes/Unicron');
const BaseCommand = require('../../classes/BaseCommand');
const { Regex } = require('../../utils');

module.exports = class extends BaseCommand {
    constructor() {
        super({
            config: {
                name: 'shard',
                description: 'Shows what shard your server is located on',
                permission: 'User',
            },
            options: {
                aliases: [],
                clientPermissions: [],
                cooldown: 3,
                nsfwCommand: false,
                args: false,
                usage: 'shard [Guild ID]',
                donatorOnly: false,
                premiumServer: false,
            }
        });
        this.snowflake = Regex.discord.snowflake;
        this.findGuild = function (id) {
            const guild = this.guilds.cache.get(id);
            if (!guild) return null;
            return guild;
        }
    }
    /**
     * @returns {Promise<Message|boolean>}
     * @param {Client} client 
     * @param {Message} message 
     * @param {Array<string>} args 
     */
    async run(client, message, args) {
        if (args.length) {
            client.shard.broadcastEval(`(${this.findGuild}).call(this, '${args[0]}')`)
                .then((results) => {
                    const result = results.find(g => g);
                    if (!result) {
                        return message.channel.send(`i couldn't find that guild, sorry :/`);
                    }
                    message.channel.send(`That server is located on shard ${result.shardID}`);
            });
            return;
        }
        message.channel.send(`This server is located on shard ${message.guild.shardID}`);
    }
}