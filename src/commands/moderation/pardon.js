const Discord = require('discord.js');

module.exports = {
	/**
     *
     * @param {Discord.Client} client Client
     * @param {Discord.Message} message Message
     * @param {Array} args Arguments
     */
    run: async function (client, message, [user_id, ...reason]) {
        try {
            const member = await message.guild.fetchBan(user_id);
            try {
                const user = await message.guild.members.unban(member.user.id, reason ? reason.join(' ') : 'No reason provided');
                const modChannel = await client.channels.fetch(await message.guild.db.moderation('modLogChannel'));
                if (modChannel) {
                    modChannel.send(new Discord.MessageEmbed()
                        .setColor('RANDOM')
                        .setTimestamp()
                        .setAuthor(`${message.author.tag} / ${message.author.id}`, message.author.displayAvatarURL() || message.guild.iconURL())
                        .setDescription(`**Member** : ${user.tag} / ${user.id}\n**Action** : Pardon/Unban\n**Reason** : ${reason ? reason.join(' ') : 'No reason provided'}`)
                    );
                }
                message.channel.send('User was pardoned!');
            }
            catch (e) {
                return message.channel.send('Sorry, i couldnt unban that user.');
            }
        }
        catch (e) {
            message.channel.send('That user is not banned from this server or its an Unknown Ban');
        }
    },
    config: {
        name: 'pardon',
        description: 'Pardon/unban someone from the server!',
        permission: 'Server Moderator',
    },
    options: {
        aliases: [],
        clientPermissions: ['BAN_MEMBERS'],
        cooldown: 10,
        nsfwCommand: false,
        args: true,
        usage: 'pardon [UserID] [Reason](Optional)',
        donatorOnly: false,
        premiumServer: false,
    },
};