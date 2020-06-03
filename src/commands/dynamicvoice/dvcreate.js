
const Discord = require('discord.js');

module.exports = {
    /**
     * 
     * @param {Discord.Client} client Client
     * @param {Discord.Message} message Message
     * @param {Array} args Arguments
     */
    run: async function (client, message, args) {
        let response = await client.awaitReply(message, 'Please select a name for a channel of which to have the dynamic voice channels in\nType `cancel` to cancel this command', 20000, true) //Asks for a category to set DVC In

        if(!response) return message.channel.send('No response was given, canceling command...') //Stops execution if no response
        if(response.content === 'cancel') return message.channel.send('Command was canceled...') //Stops execution if command cancel is run
        const category = await message.guild.db.dynamicVoice('category')

        const chan = await message.guild.channels.create(`${response}`, {type: 'voice', parent: category});

        const waitingroom = await message.guild.db.dynamicVoice('waitingRoom')
        const model = await message.guild.db.dynamicVoice(true);
        model.waitingRoom = chan.id;

        await model.save()
    },
    config: {
        name: 'dvcreate',
        description: 'Create a Dynamic VoiceChannel',
        permission: 'User',
    },
    options: {
        aliases: [],
        clientPermissions: [],
        cooldown: 3,
        nsfwCommand: false,
        args: false,
        usage: 'dvcreate [name](_Optional_)',
        donatorOnly: false,
        premiumServer: false,
    }
}