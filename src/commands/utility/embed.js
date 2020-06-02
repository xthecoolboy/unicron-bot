
const Discord = require('discord.js');

const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);

module.exports = {
    /**
     * 
     * @param {Discord.Client} client Client
     * @param {Discord.Message} message Message
     * @param {Array} args Arguments
     */
    run: async function (client, message, args) {
        if (message.flags.includes('json')) {
            try {
                const json = JSON.parse(args.join(' '));
                return message.channel.send({
                    embed: json
                })
            } catch (error) {
                return message.channel.send(`\`ERROR\`\n\`\`\`xl\n${trim(error, 512)}\n\`\`\``);
            }
        }
        return message.channel.send(new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL() || client.user.displayAvatarURL())
            .setDescription(trim(args.join(' '), 2048))
        );
    },
    config: {
        name: 'embed',
        description: `MessageEmbed Constructor!
        \`embed -json {"title": "My title", "description": "My description"}\`
        \`embed -json {"author": {"name": "My author name", "icon_url": "url here"}, "description": "My description"}\`
        \`embed -json {"fields": [{"name": "My field name", "value": "My field value"}, {"name": "My field name", "value": "My field value", "inline": false}]}\``,
        permission: 'User',
    },
    options: {
        aliases: [],
        clientPermissions: [],
        cooldown: 10,
        nsfwCommand: false,
        args: true,
        usage: 'embed [...Text]\nembed -json [Raw JSON]',
        donatorOnly: false,
        premiumServer: false,
    }
}