
const Discord = require('discord.js');

module.exports = {
    run: async function (client, message, args) {
        return message.channel.send(new Discord.MessageEmbed()
            .setColor(0x00FFFF)
            .setTitle('Unicron\'s Support Server and invite link.')
            .setDescription(`[Support Server](${client.unicron.serverInviteURL} 'Click here')
                        [Invite me to your server](https://tinyurl.com/unicron-bot/ 'Click here')
                        [Donate](${client.unicron.serverInviteURL} 'It\'s not ready yet')
                        `)
            .setFooter('Bot coded by undefine#6084'));
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