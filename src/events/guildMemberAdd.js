const { Client, GuildMember, MessageEmbed } = require('discord.js');

const Guild = require('../handlers/Guild');
const Member = require('../handlers/Member');

/**
 * @param {Client} client
 * @param {GuildMember} member
 */
module.exports = async (client, member) => {
    if (member.user.bot) return;
    const tmp = new Member(member.user.id, member.guild.id);
    await tmp.captcha.regenerate();
    const guild = new Guild(member.guild.id);
    const verifier = await guild.verification('type');
    if (['discrim', 'captcha'].includes(verifier)) {
        if (await guild.verification('enabled') && await guild.verification('channel') && await guild.verification('role')) {
            const dm = await member.user.createDM();
            switch (verifier) {
                case 'discrim': {
                    await dm.send(new MessageEmbed()
                        .setTimestamp()
                        .setColor(0xD3D3D3)
                        .setTitle(`Welcome to ${member.guild.name}`)
                        .setAuthor(`This server is protected by [Unicron](${client.unicron.serverInviteURL} 'Unicron's Support Server'), a powerful bot that prevents servers from being raided`, client.user.displayAvatarURL())
                        .setDescription(`To get yourself verified use \`I am XXXX\`, where \`XXXX\` is your discriminator at ${member.guild.channels.resolve(await guild.verification('channel'))}\nEg: \`I am ${member.user.discriminator}\``)
                    );
                    break;
                }
                case 'captcha': {
                    await dm.send(new MessageEmbed()
                        .setTimestamp()
                        .setColor(0xD3D3D3)
                        .setTitle(`Welcome to ${member.guild.name}`)
                        .setAuthor(`This server is protected by [Unicron](${client.unicron.serverInviteURL} 'Unicron's Support Server'), a powerful bot that prevents servers from being raided`, client.user.displayAvatarURL())
                        .setDescription(`To get yourself verified use \`>verify [Captcha]\` at ${member.guild.channels.resolve(await guild.verification('channel'))}.\nEg: \`>verify ${await tmp.captcha.fetch()}\`\n\nCaptcha: \`${await tmp.captcha.fetch()}\``)
                    );
                    break;
                }
            }
        }
    }
    const channel_id = await guild.welcomer('channel');
    const message = await guild.welcomer('message');
    const enabled = await guild.welcomer('enabled');
    if (!channel_id || !enabled || !message) return;
    const channel = await client.channels.fetch(channel_id);
    if (!channel) return;
    channel.send(message.replace('{user}', member.user));
}