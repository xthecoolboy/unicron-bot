const { Client, Message, MessageEmbed, Collection } = require('discord.js');



/**
 * @param {Client} client
 * @param {Message} message
 */
module.exports = async (client, message) => {
    const args = message.content.split(/ +/);
    const commandName = args.shift().toLowerCase();
    try {
        let embed = new MessageEmbed()
            .setColor('RANDOM')
            .setTimestamp()
            .setFooter(message.author.tag, message.author.displayAvatarURL() || null);
        switch (commandName) {
            case 'help': {
                embed.setTitle('Help Command')
                    .setDescription(`help - shows this help command`)
                break;
            }
            default: {
                return;
            }
        }
        message.channel.send(embed);
    } catch (e) {
        message.channel.send(new MessageEmbed()
            .setColor('RED')
            .setDescription(`Something went wrong executing that command. If this keeps on happening please report it to the Bot Developer to handle this issue at [Support Server](${client.unicron.serverInviteURL}).`)
        );
        client.logger.log(`Error on command : ${command.config.name} : ${e} `, 'error');
    }

}