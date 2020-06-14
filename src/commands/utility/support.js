
const Discord = require('discord.js');
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
        return message.channel.send(new Discord.MessageEmbed()
            .setColor(0x00FFFF)
            .setTitle('Unicron')
            .setDescription(`[Unicron's Support Server](${client.unicron.serverInviteURL} 'Click here')
                        [Invite Unicron to your server](https://tinyurl.com/unicron-bot/ 'Click here')
                        [Donate](${client.unicron.serverInviteURL} 'It\'s not ready yet')
                        `)
            .setFooter('Bot by undefine#6084'));
    },
    config: {
        name: 'support',
        description: 'Shows Unicron\'s Support Server and invite link',
        permission: 'User',
    },
    options: {
        aliases: ['invite'],
        cooldown: 3,
        nsfwCommand: false,
        args: false,
        usage: '',
        donatorOnly: false,
    }
}