
const { Message, MessageEmbed } = require('discord.js');
const Client = require('../../classes/Unicron');
const BaseCommand = require('../../classes/BaseCommand');
const fetch = require('node-fetch');

module.exports = class extends BaseCommand {
    constructor() {
        super({
            config: {
                name: 'steam',
                description: 'Searches a Game on Steam for your query.',
                permission: 'User',
            },
            options: {
                aliases: [],
                clientPermissions: ['EMBED_LINKS'],
                cooldown: 3,
                nsfwCommand: false,
                args: true,
                usage: 'steam <Steam Game>',
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
        const query = args.join(' ');
        try {
            const id = await this.search(query);
            if (!id) return message.channel.send('Could not find any results.');
            const data = await this.fetchGame(id);
            const current = data.price_overview ? `$${data.price_overview.final / 100}` : 'Free';
            const original = data.price_overview ? `$${data.price_overview.initial / 100}` : 'Free';
            const price = current === original ? current : `~~${original}~~ ${current}`;
            const platforms = [];
            if (data.platforms) {
                if (data.platforms.windows) platforms.push('Windows');
                if (data.platforms.mac) platforms.push('Mac');
                if (data.platforms.linux) platforms.push('Linux');
            }
            message.channel.send(new MessageEmbed()
                .setColor(0x101D2F)
                .setAuthor('Steam', 'https://i.imgur.com/xxr2UBZ.png', 'http://store.steampowered.com/')
                .setTitle(data.name)
                .setURL(`http://store.steampowered.com/app/${data.steam_appid}`)
                .setThumbnail(data.header_image)
                .addField('❯ Price', price, true)
                .addField('❯ Metascore', data.metacritic ? data.metacritic.score : '???', true)
                .addField('❯ Recommendations', data.recommendations ? client.formatNumber(data.recommendations.total) : '???', true)
                .addField('❯ Platforms', platforms.join(', ') || 'None', true)
                .addField('❯ Release Date', data.release_date ? data.release_date.date : '???', true)
                .addField('❯ DLC Count', data.dlc ? client.formatNumber(data.dlc.length) : 0, true)
                .addField('❯ Developers', data.developers ? data.developers.join(', ') || '???' : '???')
                .addField('❯ Publishers', data.publishers ? data.publishers.join(', ') || '???' : '???')
            );
        } catch (err) {
            message.channel.send(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
        }

    }
    async search(query) {
        const queries = `?cc=us&l=en&term=${encodeURIComponent(query)}`;
        const response = await fetch(`https://store.steampowered.com/api/storesearch${queries}`)
        const body = await response.json();
        if (!body.items.length) return null;
        return body.items[0].id;
    }

    async fetchGame(id) {
        const response = await fetch(`https://store.steampowered.com/api/appdetails?appids=${id}`);
        const body = await response.json();
        return body[id.toString()].data;
    }
}