
const Discord = require('discord.js');
const gateway = [
    'https://cataas.com/cat',
    'https://cataas.com/cat/gif'
]

module.exports = {
    /**
     * 
     * @param {Discord.Client} client Client
     * @param {Discord.Message} message Message
     * @param {Array} args Arguments
     */
    run: async function (client, message, args) {
        try {
            message.channel.send(new Discord.MessageEmbed()
                .setImage(gateway.random())
                .setTitle('Cats <3')
                .setFooter(message.author.tag, message.author.displayAvatarURL() || null)
            );
        } catch (e) {
            throw e;
        }
    },
    config: {
        name: 'cat',
        description: 'Cat pictures <3 _from reddit_',
        permission: 'User',
    },
    options: {
        aliases: [],
        clientPermissions: [],
        cooldown: 10,
        nsfwCommand: false,
        args: false,
        usage: '',
        donatorOnly: false,
        premiumServer: false,
    }
}