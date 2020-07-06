
const { Message, MessageEmbed } = require('discord.js');
const Client = require('../../classes/Unicron');
const BaseCommand = require('../../classes/BaseCommand');
const moment = require('moment');
const fetch = require('node-fetch');

module.exports = class extends BaseCommand {
    constructor() {
        super({
            config: {
                name: 'github',
                description: 'Sends information of a GitHub repository',
                permission: 'User',
            },
            options: {
                aliases: [],
                clientPermissions: ['EMBED_LINKS'],
                cooldown: 3,
                nsfwCommand: false,
                args: true,
                usage: 'github <Username|Organization>/<Repository>',
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
        const repo = args[0].split('/');
        if (!args || !repo || repo.length <= 1) {
            return message.channel.send(`Invalid arguments, proper usage would be \n\`\`\`\ngithub <Username|Organization>/<Repository>\n\`\`\``);
        }
        const author = repo.shift();
        const repository = repo.shift();
        try {
            const response = await fetch(`https://api.github.com/repos/${encodeURIComponent(author)}/${encodeURIComponent(repository)}`).catch(e => { throw e });
            const body = await response.json();
            if (body.message && body.message === 'Not Found') throw { status: 404 };
            message.channel.send(new MessageEmbed()
                .setColor(0xFFFFFF)
                .setAuthor('GitHub', 'https://i.imgur.com/e4HunUm.png', 'https://github.com/')
                .setTitle(body.full_name)
                .setURL(body.html_url)
                .setDescription(body.description ? client.shorten(body.description) : 'No description.')
                .setThumbnail(body.owner ? (body.owner.avatar_url ? body.owner.avatar_url : null) :
                    (body.organization ? (body.organization.avatar_url ? body.organization.avatar_url : null) : null))
                .addField('❯ Stars', client.formatNumber(body.stargazers_count), true)
                .addField('❯ Forks', client.formatNumber(body.forks), true)
                .addField('❯ Issues', client.formatNumber(body.open_issues), true)
                .addField('❯ Language', body.language || '???', true)
                .addField('❯ Creation Date', moment.utc(body.created_at).format('MM/DD/YYYY h:mm A'), true)
                .addField('❯ Modification Date', moment.utc(body.updated_at).format('MM/DD/YYYY h:mm A'), true)
            );
        } catch (err) {
            if (err.status === 404) return message.channel.send('Could not find any results.');
            return message.channel.send(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
        }
    }
}