
const Discord = require('discord.js');
const { Random } = require('../../utils');

module.exports = {
    /**
     * 
     * @param {Discord.Client} client Client
     * @param {Discord.Message} message Message
     * @param {Array} args Arguments
     */
    run: async function (client, message, args) {
        const prize = Random.nextInt({ max: 1200, min: 1000 });
        await message.author.db.coins.add(prize);
        message.channel.send(`You have received **${prize}** coins!`);
    },
    config: {
        name: 'payday',
        description: 'ITS PAYDAY',
        permission: 'User',
    },
    options: {
        aliases: [],
        clientPermissions: [],
        cooldown: 50 * 60 * 24,
        nsfwCommand: false,
        args: false,
        usage: '',
        donatorOnly: false,
        premiumServer: false,
    }
}