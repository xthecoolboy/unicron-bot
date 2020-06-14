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

        const isCommand = message.flags.includes('command');
        const isItem = message.flags.includes('item');
        const isCrate = message.flags.includes('crate');

        if (!isCommand) {
            if (isItem) {

            } else if (isCrate) {

            }
        }
        const command = client.commands.get(args[0]);
        let response = await client.unloadCommand(args[0]);
        if (response) return message.reply(`Error Unloading: ${response}`);

        response = client.loadCommand(command.config.name, command.config.category);
        if (response) return message.reply(`Error Loading: ${response}`);

        return message.reply(`The command \`${command.config.name}\` has been reloaded`);
    },
    config: {
        name: 'reload',
        description: 'Reloads a command that was modified background.',
        permission: 'Bot Owner',
    },
    options: {
        cooldown: 3,
        nsfwCommand: false,
        args: true,
        usage: 'reload [-command|-item|-crate] [itemName|crateName|commandName]',
        donatorOnly: false,
        premiumServer: false,
    }
}