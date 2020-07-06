
const { Message, MessageEmbed } = require('discord.js');
const Client = require('../../classes/Unicron');
const BaseCommand = require('../../classes/BaseCommand');
const fetch = require('node-fetch');

module.exports = class extends BaseCommand {
    constructor() {
        super({
            config: {
                name: 'mdn',
                description: 'Searches MDN for your query.',
                permission: 'User',
            },
            options: {
                aliases: [],
                clientPermissions: ['EMBED_LINKS'],
                cooldown: 3,
                nsfwCommand: false,
                args: true,
                usage: 'mdn <Search Query>',
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
        const query = args[0].replace(/#/g, '.prototype.');
        try {
            const response = await fetch(`https://developer.mozilla.org/en-US/search.json?q=${query}&locale=en-US&highlight=false`);
            const body = await response.json();
            if (!body.documents.length) return message.channel.send('Could not find any results.');
            const data = body.documents[0];
            return message.channel.send(new MessageEmbed()
                .setColor(0x066FAD)
                .setAuthor('MDN', 'https://i.imgur.com/DFGXabG.png', 'https://developer.mozilla.org/')
                .setURL(data.url)
                .setTitle(data.title)
                .setDescription(data.excerpt));
        } catch (e) {
            throw e;
        }
    }
}