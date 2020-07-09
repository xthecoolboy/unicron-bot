
const { Message, MessageEmbed } = require('discord.js');
const Client = require('../../classes/Unicron');
const BaseCommand = require('../../classes/BaseCommand');
const fetch = require('node-fetch');

module.exports = class extends BaseCommand {
    constructor() {
        super({
            config: {
                name: 'foaas',
                description: 'Sends a Random F*ck Off As A Service!',
                permission: 'User',
            },
            options: {
                aliases: ['fuckoff', 'ffs'],
                clientPermissions: [],
                cooldown: 10,
                nsfwCommand: true,
                args: false,
                usage: '',
                donatorOnly: false,
                premiumServer: false,
            }
        });
        this.endpoints = [
            '/asshole/', '/awesome/',
            '/bag/', '/because/',
            '/bucket/', '/bye/',
            '/cool/', '/cup/',
            '/even/', '/everyone/',
            '/everything/', '/family/',
            '/fascinating/', '/flying/',
            '/ftfy/', '/fyyff/',
            '/give/', '/holygrail/',
            '/horse/', '/idea/',
            '/immensity/', '/jinglebells/',
            '/life/', '/logs/',
            '/looking/', '/maybe/',
            '/me/', '/mornin/',
            '/no/', '/pink/',
            '/programmer/', '/question/',
            '/ratsarse/', '/retard/',
            '/ridiculous/', '/rtfm/',
            '/sake/', '/shit/',
            '/single/', '/thanks/',
            '/that/', '/this/',
            '/too/', '/tucker/',
            '/what/', '/zayn/',
            '/zero/',
        ];
    }
    /**
     * @returns {Promise<Message|boolean>}
     * @param {Client} client 
     * @param {Message} message 
     * @param {Array<string>} args 
     */
    async run(client, message, args) {
        const from = message.author.tag;
        try {
            const response = await fetch.default(`https://www.foaas.com${this.endpoints[Math.floor(Math.random() * this.endpoints.length)]}${from}`, {
                headers: {
                    Accept: 'application/json'
                }
            });
            const body = await response.json();
            return message.channel.send(body.message);
        } catch (e) {
            throw e;
        }
    }
}