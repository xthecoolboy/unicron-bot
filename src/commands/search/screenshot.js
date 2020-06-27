
const { Message } = require('discord.js');
const Client = require('../../classes/Unicron');
const BaseCommand = require('../../classes/BaseCommand');
const fetch = require('node-fetch');
const url = require('url');

module.exports = class extends BaseCommand {
    constructor() {
        super({
            config: {
                name: 'screenshot',
                description: 'Takes a screenshot of any webpage.',
                permission: 'User',
            },
            options: {
                aliases: ['capture', 'snap'],
                clientPermissions: ['ATTACH_FILES'],
                cooldown: 10,
                nsfwCommand: true,
                args: true,
                usage: 'screenshot <URL>',
                donatorOnly: false,
                premiumServer: false,
            }
        });
    }
    /**
     * @returns {Promise<Message|Boolean>}
     * @param {Client} client 
     * @param {Message} message 
     * @param {Array<String>} args 
     */
    async run(client, message, args) {
        const urls = args[0];
        const site = /^(https?:\/\/)/i.test(urls) ? urls : `http://${urls}`;
        try {
			const { body } = await fetch(`https://image.thum.io/get/width/1920/crop/675/noanimate/${site}`);
			return message.channel.send(`\`\`\`\n${site}\n\`\`\``,{ files: [{ attachment: body, name: 'screenshot.png' }] });
		} catch (err) {
			if (err.status === 404) return message.channel.send('Could not find any results. Invalid URL?');
			return message.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
    }
}