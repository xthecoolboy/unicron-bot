
module.exports = {
    run: async function (client, message, args) {
        const friendly = client.permission[`${message.author.permLevel}`];
        return message.reply(`Your permission level is: ${message.author.permLevel} - ${friendly}`);
    },
    config: {
        name: 'permissions',
        description: 'Tells you your permission level for the current message guild location.',
        permission: 'User',
    },
    options: {
        cooldown: 3,
        nsfwCommand: false,
        args: false,
        usage: '',
        donatorOnly: false,
    }
}