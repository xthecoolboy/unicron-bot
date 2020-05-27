
const Discord = require('discord.js');

module.exports = {
    run: async function (client, message, args) {
        return message.channel.send(new Discord.MessageEmbed()
            .setColor(0x00FFFF)
            .setDescription(`My Prefix for this Server/Guild is \`${await message.guild.db.settings('prefix')}\` or you can just ping me as the prefix.\n
                        You can change my prefix using \`${await message.guild.db.settings('prefix')}config set prefix [prefix]\` but you need to be an Administrator to do this..`));
    },
    config: {
        name: 'prefix',
        description: 'Shows Unicron\'s prefix for this server.',
        permission: 'User',
    },
    options: {
        cooldown: 3,
        args: false,
        usage: '',
        donatorOnly: false,
    }
}