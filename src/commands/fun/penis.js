
const Discord = require('discord.js');
const { Random } = require('../../utils/');
const { Message } = require('discord.js');
const Client = require('../../classes/Unicron');

module.exports = {
    /**
     * 
     * @param {Client} client Client
     * @param {Message} message Message
     * @param {Array<String>} args Arguments
     */
    run: async function (client, message, args) {
        let target;
        if (message.mentions.users.size) {
            target = message.mentions.users.first();
        } else if (args.length) {
            target = await client.fetchUser(args[0]);
        } else {
            target = message.author;
        }
        if (!target) {
            target = message.author;
        }
        let embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`${target.tag}\'s penis`);
        let max = Random.nextInt({ max: 30, min: 0});
        let gland = '';
        for (let i = 0; i < max; i++) {
            gland += '=';
        }
        embed.setDescription(`8${gland}D`);
        return message.channel.send(embed);
    },
    config: {
        name: 'penis',
        description: 'User Penis length identifier 1000',
        permission: 'User',
    },
    options: {
        cooldown: 12,
        args: false,
        usage: 'penis [user]',
    }
}