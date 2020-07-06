const Discord = require('discord.js');
const { Message } = require('discord.js');
const Client = require('../../classes/Unicron');
const BaseCommand = require('../../classes/BaseCommand');

module.exports = class extends BaseCommand {
    constructor() {
        super({
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
        });
    }
    /**
     * @returns {Promise<Message|boolean>}
     * @param {Client} client 
     * @param {Message} message 
     * @param {Array<string>} args 
     */
    async run(client, message, args) {
        const prefix = message.guild.db.settings('prefix');
        return message.channel.send(new Discord.MessageEmbed()
            .setColor(0x00FFFF)
            .setDescription(`
            My Prefix for this Server/Guild is \`${prefix}\` or you can just ping me as the prefix.\n
            You can change my prefix using \`${prefix}config set prefix [prefix]\` but you need permission level \`Server Administrator\`.`
            )
        );
    }
}