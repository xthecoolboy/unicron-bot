
const Discord = require('discord.js');
const { Random } = require('../../utils');

module.exports = {
    /**
     * 
     * @param {Discord.Client} client Client
     * @param {Discord.Message} message Message
     * @param {Array} args Arguments
     */
    run: async function (client, message, [job,]) {
        switch (job) {
            case 'mailman': {
                break;
            }
            case 'developer': {
                break;
            }
            case 'carpenter': {
                break;
            }
            case 'mechanic': {
                break;
            }
            case 'police': {
                break;
            }
            default: {
                message.channel.send(new Discord.MessageEmbed()
                    .setColor('RED')
                    .setTimestamp()
                    .setDescription(`Hey, that is not a valid job.\nAvailable Jobs:\nmailman, developer, carpenter, mechanic, police`)
                );
            }
        }
    },
    config: {
        name: 'work',
        description: 'Earn coins by working!\nJobs:\nmailman, developer, carpenter, mechanic, police',
        permission: 'User',
    },
    options: {
        aliases: [],
        clientPermissions: [],
        cooldown: 60000 * 60,
        nsfwCommand: false,
        args: true,
        usage: 'work [Job]',
        donatorOnly: false,
        premiumServer: false,
    }
}