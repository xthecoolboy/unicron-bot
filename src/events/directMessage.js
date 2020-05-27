const { Client, Message, MessageEmbed } = require('discord.js');


const prefix = '?';

/**
 * @param {Client} client
 * @param {Message} message
 */
module.exports = async (client, message) => {
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${client.escapeRegex(prefix)})\\s*`);
    if (!prefixRegex.test(message.content)) return;
    const [, matchedPrefix] = message.content.match(prefixRegex);
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    try {
        switch (commandName) {
            case 'help': {
                break;
            }
            default: {
                break;
            }
        }
    } catch (e) {
        message.channel.send(new MessageEmbed()
            .setColor('RED')
            .setDescription(`Something went wrong executing that command. If this keeps on happening please report it to the Bot Developer to handle this issue at [Support Server](${client.unicron.serverInviteURL}).`)
        );
        client.logger.log(`Error on command : ${command.config.name} : ${e} `, 'error');
    }

}