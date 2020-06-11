
const Discord = require('discord.js');
const { Random } = require('../../utils')

module.exports = {
    /**
     * 
     * @param {Discord.Client} client Client
     * @param {Discord.Message} message Message
     * @param {Array} args Arguments
     */
    run: async function (client, message, args) {
        const prize = Random.nextInt({ max: 700, min: 500 });
        await message.author.db.coins.add(prize);
        message.channel.send(`You have gotten **${prize}** coins!`);
    },
    config: {
        name: 'hourly',
        description: 'Get paid per hour using this command!',
        permission: 'User',
    },
    options: {
        aliases: [],
        clientPermissions: [],
        cooldown: 3600,
        nsfwCommand: false,
        args: false,
        usage: '',
        donatorOnly: false,
        premiumServer: false,
    }
}