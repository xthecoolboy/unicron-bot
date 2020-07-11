
const Discord = require('discord.js');
const { Message } = require('discord.js');
const Client = require('../../classes/Unicron');
const BaseCommand = require('../../classes/BaseCommand');
const slaps = [
    'https://i.giphy.com/media/3XlEk2RxPS1m8/giphy.gif',
    'https://i.giphy.com/media/mEtSQlxqBtWWA/giphy.gif',
    'https://i.giphy.com/media/j3iGKfXRKlLqw/giphy.gif',
    'https://i.giphy.com/media/2M2RtPm8T2kOQ/giphy.gif',
    'https://i.giphy.com/media/l3YSimA8CV1k41b1u/giphy.gif',
    'https://i.giphy.com/media/WLXO8OZmq0JK8/giphy.gif',
    'https://media1.tenor.com/images/0720ffb69ab479d3a00f2d4ac7e0510c/tenor.gif',
    'https://media1.tenor.com/images/8b80166ce48c9c198951361715a90696/tenor.gif',
    'https://media1.tenor.com/images/6aa432caad8e3272d21a68ead3629853/tenor.gif',
    'https://media1.tenor.com/images/4ec47d7b87a9ce093642fc8a3c2969e7/tenor.gif'
];

module.exports = class extends BaseCommand {
    constructor() {
        super({
            config: {
                name: 'slap',
                description: 'Give the user a slap!',
                permission: 'User',
            },
            options: {
                aliases: [],
                clientPermissions: [],
                cooldown: 10,
                nsfwCommand: false,
                args: true,
                usage: 'slap <UserMention>',
                donatorOnly: false,
                premiumServer: false,
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
        const user = message.mentions.users.first();
        if (!user) return message.channel.send('Oh oh... you gotta provide a valid user to slap :/');
        return message.channel.send(new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setImage(slaps[Math.floor(Math.random() * slaps.length)])
            .setDescription(`${message.author.username} slapped ${user.username}!`)
        );
    }
}