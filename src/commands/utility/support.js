
const Discord = require('discord.js');

module.exports = {
    run: async function (client, message, args) {
        return message.channel.send(new Discord.MessageEmbed()
            .setColor(0x00FFFF)
            .setTitle('Unicron\'s Support Server and invite link.')
            .setDescription(`[Support Server](${client.unicron.serverInviteURL} 'Click here')
                        [Invite me to your server](https://discord.com/oauth2/authorize?client_id=634908645896880128&redirect_uri=https%3A%2F%2Fdiscord.com%2Foauth2%2Fauthorize%3Fclient_id%3D634908645896880128%26permissions%3D499510391%26scope%3Dbot&response_type=code&scope=identify%20guilds/ 'Click here')
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