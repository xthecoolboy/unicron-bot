const { Message, MessageEmbed, Collection } = require('discord.js');

const Client = require('../classes/Unicron');

const BaseEvent = require('../classes/BaseEvent');

module.exports = class extends BaseEvent {
    constructor() {
        super('directMessage');
    }
    /**
     * @param {Client} client
     * @param {Message} message
     */
    async run(client, message) {
        const args = message.content.split(/ +/);
        const commandName = args.shift().toLowerCase();
        try {
            let embed = new MessageEmbed()
                .setColor('RANDOM')
                .setTimestamp()
                .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || null);
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
}