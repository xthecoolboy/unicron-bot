const { GuildMember, MessageEmbed } = require('discord.js');
const Blacklist = require('../modules/Blacklist');
const Member = require('../classes/GuildMember');
const Client = require('../classes/Unicron');
const BaseEvent = require('../classes/BaseEvent');

module.exports = class extends BaseEvent {
    constructor() {
        super('guildMemberAdd');
    }
    /**
     * @param {Client} client
     * @param {GuildMember} member
     */
    async run(client, member) {
        if (member.user.bot) return;
        if (await Blacklist(client, member.user.id, member.guild.id)) return;
        const tmp = new Member(member.user.id, member.guild.id);
        await tmp.captcha.regenerate();
        const guild = await client.database.guilds.fetch(member.guild.id);
        const verifier = guild.verification('type');
        if (['discrim', 'captcha'].includes(verifier)) {
            const enabled = guild.verification('enabled');
            const channel = guild.verification('channel');
            const role = guild.verification('role');
            if (enabled && channel && role) {
                try {
                    const dm = await member.user.createDM();
                    switch (verifier) {
                        case 'discrim': {
                            await dm.send(new MessageEmbed()
                                .setTimestamp()
                                .setColor(0xD3D3D3)
                                .setTitle(`Welcome to ${member.guild.name}`)
                                .setAuthor(client.user.tag, client.user.displayAvatarURL({ dynamic: true }))
                                .setDescription(`This server is protected by [Unicron](${client.unicron.serverInviteURL} 'Unicron's Support Server'), a powerful bot that prevents servers from being raided\nTo get yourself verified use \`I am XXXX\`, where \`XXXX\` is your discriminator at ${member.guild.channels.resolve(guild.verification('channel'))}\nEg: \`I am ${member.user.discriminator}\``)
                            );
                            break;
                        }
                        case 'captcha': {
                            await dm.send(new MessageEmbed()
                                .setTimestamp()
                                .setColor(0xD3D3D3)
                                .setTitle(`Welcome to ${member.guild.name}`)
                                .setAuthor(client.user.tag, client.user.displayAvatarURL({ dynamic: true }))
                                .setDescription(`This server is protected by [Unicron](${client.unicron.serverInviteURL} 'Unicron's Support Server'), a powerful bot that prevents servers from being raided\nTo get yourself verified use \`>verify [Captcha]\` at ${member.guild.channels.resolve(guild.verification('channel'))}.\nEg: \`>verify ${await tmp.captcha.fetch()}\`\n\nCaptcha: \`${await tmp.captcha.fetch()}\``)
                            );
                            break;
                        }
                    }
                    setTimeout(async () => {
                        await member.fetch();
                        if (!member.roles.cache.has(role) && member.kickable) await member.kick('Did not verified in 10 mins').catch(() => { });
                    }, 60000 * 10);
                } catch (e) {

                }
            }
        }
        const channel_id = guild.welcomer('channel');
        const message = guild.welcomer('message');
        const enabled = guild.welcomer('enabled');
        if (!channel_id || !enabled || !message) return;
        const channel = await client.channels.fetch(channel_id);
        if (!channel) return;
        channel.send(message.replace('{user}', member.user));
    }
}