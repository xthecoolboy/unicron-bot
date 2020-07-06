
const { Message, MessageEmbed } = require('discord.js');
const Client = require('../../classes/Unicron');
const BaseCommand = require('../../classes/BaseCommand');
const fetch = require('node-fetch');
const moment = require('moment');

module.exports = class extends BaseCommand {
    constructor() {
        super({
            config: {
                name: 'stackoverflow',
                description: 'Searches Stack Overflow for your query',
                permission: 'User',
            },
            options: {
                aliases: [],
                clientPermissions: ['EMBED_LINKS'],
                cooldown: 3,
                nsfwCommand: false,
                args: true,
                usage: 'stackoverflow <Search Query>',
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
        const query = encodeURIComponent(args.join(' '));
        const queries = `?q=${query}&page=1&pagesize=1&order=asc&sort=relevance&answers=1&site=stackoverflow`;
        try {
            const response = await fetch(`http://api.stackexchange.com/2.2/search/advanced${queries}`);
            const body = await response.json();
			if (!body.items.length) return message.channel.send('Could not find any results.');
            const data = body.items[0];
            message.channel.send(new MessageEmbed()
				.setColor(0xF48023)
				.setAuthor('Stack Overflow', 'https://i.imgur.com/P2jAgE3.png', 'https://stackoverflow.com/')
				.setURL(data.link)
				.setTitle(data.title)
				.addField('❯ ID', data.question_id, true)
				.addField('❯ Asker', client.embedURL(data.owner.display_name, data.owner.link), true)
				.addField('❯ Views', client.formatNumber(data.view_count), true)
				.addField('❯ Score', client.formatNumber(data.score), true)
				.addField('❯ Creation Date', moment.utc(data.creation_date * 1000).format('MM/DD/YYYY h:mm A'), true)
				.addField('❯ Last Activity', moment.utc(data.last_activity_date * 1000).format('MM/DD/YYYY h:mm A'), true))
		} catch (err) {
			return message.channel.send(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
    }
}