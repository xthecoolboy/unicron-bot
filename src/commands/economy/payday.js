
const { Random } = require('../../utils');
const { Message } = require('discord.js');
const Client = require('../../classes/Unicron');
const BaseCommand = require('../../classes/BaseCommand');

module.exports = class extends BaseCommand {
    constructor() {
        super({
            config: {
                name: 'payday',
                description: 'ITS PAYDAY',
                permission: 'User',
            },
            options: {
                aliases: ['daily'],
                clientPermissions: [],
                cooldown: 60 * 60 * 24,
                nsfwCommand: false,
                args: false,
                usage: '',
                donatorOnly: false,
                premiumServer: false,
            }
        });
    }
    /**
     * @returns {Promise<Message|Boolean>}
     * @param {Client} client 
     * @param {Message} message 
     * @param {Array<String>} args 
     */
    async run(client, message, args) {
        const prize = Random.nextInt({ max: 1200, min: 1000 });
        await message.author.db.coins.add(prize);
        message.channel.send(`You have received **${prize}** coins!`);
    }
}