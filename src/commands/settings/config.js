const Discord = require('discord.js');
const ms = require('ms');
const { Message } = require('discord.js');
const Client = require('../../classes/Unicron');
const BaseCommand = require('../../classes/BaseCommand');

module.exports = class extends BaseCommand {
    constructor() {
        super({
            config: {
                name: 'config',
                description: 'Configure Unicron\'s settings for this server.',
                permission: 'Server Administrator',
            },
            options: {
                aliases: ['conf'],
                clientPermissions: [],
                cooldown: 3,
                nsfwCommand: false,
                args: true,
                usage: 'config view\nconfig view [page]\nconfig set <key> <value>\nconfig reset\nconfig reset [key]',
                donatorOnly: false,
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
        const [action, key, ...value] = args;
        const db = await client.database.guilds.fetch(message.guild.id, true);
        if (action === 'view') {
            let embed = new Discord.MessageEmbed()
                .setColor(0x00FFFF)
                .setTimestamp();
            switch (key) {
                case '2': {
                    const inviteFilter = db.filters('inviteFilter') ? 'ON' : 'OFF';
                    const mentionSpamFilter = db.filters('mentionSpamFilter') ? 'ON' : 'OFF';
                    const swearFilter = db.filters('swearFilter') ? 'ON' : 'OFF';
                    embed.setFooter('Page 2 of 4', message.guild.iconURL() || client.user.displayAvatarURL({ dynamic: true }))
                        .addField('Key', `
                    \`inviteFilter\`
                    \`swearFilter\`
                    \`mentionSpamFilter\`
                    `, true)
                        .addField('Value', `
                    \`${inviteFilter}\`
                    \`${swearFilter}\`
                    \`${mentionSpamFilter}\`
                    `, true);
                    break;
                }
                case '3': {
                    const welcomeChannel = db.welcomer('channel') ? `<#${db.welcomer('channel')}>` : '\`none\`';
                    const welcomeMessage = db.welcomer('message');
                    const welcomer = db.welcomer('enabled') ? 'ON' : 'OFF';
                    const leaveChannel = db.leaver('channel') ? `<#${db.leaver('channel')}>` : '\`none\`';
                    const leaveMessage = db.leaver('message');
                    const leaver = db.leaver('enabled') ? 'ON' : 'OFF';
                    embed.setDescription('Use command \`welcomer\` or \`farewell\` to change these values')
                    embed.setFooter('Page 3 of 4', message.guild.iconURL() || client.user.displayAvatarURL({ dynamic: true }))
                        .addField('Key', `
                    \`welcomer\`
                    \`welcomeChannel\`
                    \`welcomeMessage\`
                    \`farewell\`
                    \`farewellChannel\`
                    \`farewellMessage\`
                    `, true)
                        .addField('Value', `
                    \`${welcomer}\`
                    ${welcomeChannel}
                    \`${welcomeMessage}\`
                    \`${leaver}\`
                    ${leaveChannel}
                    \`${leaveMessage}\`
                    `, true);
                    break;
                }
                case '4': {
                    const memberVerification = db.verification('enabled') ? 'ON' : 'OFF';
                    const verificationChannel = db.verification('channel') ? `<#${db.verification('channel')}>` : '\`none\`';
                    const verifiedRole = db.verification('role') ? `<@&${db.verification('role')}>` : '\`none\`';
                    const verificationType = db.verification('type');
                    const ticketSystem = db.ticket('enabled') ? 'ON' : 'OFF';
                    const ticketCategory = db.ticket('category') ? `<#${db.ticket('category')}>` : '\`none\`';
                    embed.setDescription('Use command \`verification\` or \`ticketconfig\` / \`ticketsetup\` to change these values.')
                    embed.setFooter('Page 4 of 4', message.guild.iconURL() || client.user.displayAvatarURL({ dynamic: true }))
                        .addField('Key', `
                    \`memberVerification\`
                    \`verificationChannel\`
                    \`verifiedRole\`
                    \`verificationType\`
                    \`ticketSystem\`
                    \`ticketCategory\`
                    `, true)
                        .addField('Value', `
                    \`${memberVerification}\`
                    ${verificationChannel}
                    ${verifiedRole}
                    \`${verificationType}\`
                    \`${ticketSystem}\`
                    ${ticketCategory}
                    `, true)
                    break;
                }
                case '1':
                default: {
                    const prefix = db.settings('prefix');
                    const modLogChannel = db.moderation('modLogChannel') ? `<#${db.moderation('modLogChannel')}>` : '\`none\`';
                    const autoModeration = db.moderation('autoModeration') ? 'ON' : 'OFF';
                    const autoModAction = `${db.moderation('autoModAction')} MEMBER`;
                    const maxWarnTreshold = db.moderation('maxWarnTreshold');
                    const warnTresholdAction = `${db.moderation('warnTresholdAction')} MEMBER`;
                    const warnActionExpiresOn = db.moderation('warnActionExpiresOn') ? ms(db.moderation('warnActionExpiresOn')) : '0s';
                    const warningExpiresOn = db.moderation('warningExpiresOn') ? ms(db.moderation('warningExpiresOn')) : '0s';
                    embed.addField('Key', `
                    \`prefix\`
                    \`modLogChannel\`
                    \`autoModeration\`
                    \`autoModAction\`
                    \`maxWarnTreshold\`
                    \`warnTresholdAction\`
                    \`warnActionExpiresOn\`
                    \`warningExpiresOn\`
                    `, true)
                        .addField('Value', `
                    \`${prefix}\`
                    ${modLogChannel}
                    \`${autoModeration}\`
                    \`${autoModAction}\`
                    \`${maxWarnTreshold}\`
                    \`${warnTresholdAction}\`
                    \`${warnActionExpiresOn}\`
                    \`${warningExpiresOn}\`
                    `, true).setFooter('Page 1 of 4', message.guild.iconURL() || client.user.displayAvatarURL({ dynamic: true }));
                    break;
                }
            }
            return message.channel.send(embed);
        } else if (action === 'reset') {
            switch (key) {
                case 'all': {
                    const yn = await client.awaitReply(message, 'Are you sure to reset Unicron\'s configurations for this server (yes/no)? _You have 15 seconds to comply_', 15000);
                    if (!['y', 'yes', 'YES'].includes(yn)) return message.channel.send('Request terminated.');
                    Promise.all([await db.destroy(false, false)]).then(() => {
                        return message.channel.send(new Discord.MessageEmbed()
                            .setColor('RANDOM')
                            .setDescription(`Successfully reseted Unicron\'s configurations for this server.`)
                            .setTimestamp()
                            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                        );
                    }).catch(e => {
                        client.logger.error(`Error on reseting configurations for ${message.guild.name}/${message.guild.id} : ${e}`);
                        return message.channel.send(new Discord.MessageEmbed()
                            .setColor('RED')
                            .setDescription(`An error occured while reseting.`)
                            .setTimestamp()
                            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                        );
                    });
                    break;
                }
                case 'prefix': {
                    const yn = await client.awaitReply(message, `Are you sure to reset Unicron\'s \`${key}\` for this server (yes/no)? _You have 15 seconds to comply_`, 15000);
                    if (!['y', 'yes', 'YES'].includes(yn)) return message.channel.send('Request terminated.');
                    const settings = db.settings(true);
                    settings.prefix = '?';
                    Promise.all([await settings.save()]).then(() => {
                        return message.channel.send(new Discord.MessageEmbed()
                            .setColor('RANDOM')
                            .setDescription(`Successfully reseted Unicron\'s \`${key}\` for this server.`)
                            .setTimestamp()
                            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                        );
                    }).catch(e => {
                        client.logger.error(`Error on reseting settings for ${message.guild.name}/${message.guild.id} : ${e}`);
                        return message.channel.send(new Discord.MessageEmbed()
                            .setColor('RED')
                            .setDescription(`An error occured while reseting.`)
                            .setTimestamp()
                            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                        );
                    });
                    break;
                }
                case 'welcomeChannel': {
                    const yn = await client.awaitReply(message, `Are you sure to reset Unicron\'s \`${key}\` for this server (yes/no)? _You have 15 seconds to comply_`, 15000);
                    if (!['y', 'yes', 'YES'].includes(yn)) return message.channel.send('Request terminated.');
                    const settings = db.welcomer(true);
                    settings.channel = '';
                    settings.enabled = false;
                    Promise.all([await settings.save()]).then(() => {
                        return message.channel.send(new Discord.MessageEmbed()
                            .setColor('RANDOM')
                            .setDescription(`Successfully reseted Unicron\'s \`${key}\` for this server.`)
                            .setTimestamp()
                            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                        );
                    }).catch(e => {
                        client.logger.error(`Error on reseting settings for ${message.guild.name}/${message.guild.id} : ${e}`);
                        return message.channel.send(new Discord.MessageEmbed()
                            .setColor('RED')
                            .setDescription(`An error occured while reseting.`)
                            .setTimestamp()
                            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                        );
                    });
                    break;
                }
                case 'welcomeMessage': {
                    const yn = await client.awaitReply(message, `Are you sure to reset Unicron\'s \`${key}\` for this server (yes/no)? _You have 15 seconds to comply_`, 15000);
                    if (!['y', 'yes', 'YES'].includes(yn)) return message.channel.send('Request terminated.');
                    const settings = db.welcomer(true);
                    settings.message = 'Welcome {user} to the server!';
                    Promise.all([await settings.save()]).then(() => {
                        return message.channel.send(new Discord.MessageEmbed()
                            .setColor('RANDOM')
                            .setDescription(`Successfully reseted Unicron\'s \`${key}\` for this server.`)
                            .setTimestamp()
                            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                        );
                    }).catch(e => {
                        client.logger.error(`Error on reseting settings for ${message.guild.name}/${message.guild.id} : ${e}`);
                        return message.channel.send(new Discord.MessageEmbed()
                            .setColor('RED')
                            .setDescription(`An error occured while reseting.`)
                            .setTimestamp()
                            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                        );
                    });
                    break;
                }
                case 'farewellChannel': {
                    const yn = await client.awaitReply(message, `Are you sure to reset Unicron\'s \`${key}\` for this server (yes/no)? _You have 15 seconds to comply_`, 15000);
                    if (!['y', 'yes', 'YES'].includes(yn)) return message.channel.send('Request terminated.');
                    const settings = db.leaver(true);
                    settings.channel = '';
                    settings.enabled = false;
                    Promise.all([await settings.save()]).then(() => {
                        return message.channel.send(new Discord.MessageEmbed()
                            .setColor('RANDOM')
                            .setDescription(`Successfully reseted Unicron\'s \`${key}\` for this server.`)
                            .setTimestamp()
                            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                        );
                    }).catch(e => {
                        client.logger.error(`Error on reseting settings for ${message.guild.name}/${message.guild.id} : ${e}`);
                        return message.channel.send(new Discord.MessageEmbed()
                            .setColor('RED')
                            .setDescription(`An error occured while reseting.`)
                            .setTimestamp()
                            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                        );
                    });
                    break;
                }
                case 'farewellMessage': {
                    const yn = await client.awaitReply(message, `Are you sure to reset Unicron\'s \`${key}\` for this server (yes/no)? _You have 15 seconds to comply_`, 15000);
                    if (!['y', 'yes', 'YES'].includes(yn)) return message.channel.send('Request terminated.');
                    const settings = db.leaver(true);
                    settings.message = '{user} has left the server.';
                    Promise.all([await settings.save()]).then(() => {
                        return message.channel.send(new Discord.MessageEmbed()
                            .setColor('RANDOM')
                            .setDescription(`Successfully reseted Unicron\'s \`${key}\` for this server.`)
                            .setTimestamp()
                            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                        );
                    }).catch(e => {
                        client.logger.error(`Error on reseting settings for ${message.guild.name}/${message.guild.id} : ${e}`);
                        return message.channel.send(new Discord.MessageEmbed()
                            .setColor('RED')
                            .setDescription(`An error occured while reseting.`)
                            .setTimestamp()
                            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                        );
                    });
                    break;
                }
                case 'modLogChannel': {
                    const yn = await client.awaitReply(message, `Are you sure to reset Unicron\'s \`${key}\` for this server (yes/no)? _You have 15 seconds to comply_`, 15000);
                    if (!['y', 'yes', 'YES'].includes(yn)) return message.channel.send('Request terminated.');
                    const settings = db.moderation(true);
                    settings.modLogChannel = '';
                    Promise.all([await settings.save()]).then(() => {
                        return message.channel.send(new Discord.MessageEmbed()
                            .setColor('RANDOM')
                            .setDescription(`Successfully reseted Unicron\'s \`${key}\` for this server.`)
                            .setTimestamp()
                            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                        );
                    }).catch(e => {
                        client.logger.error(`Error on reseting settings for ${message.guild.name}/${message.guild.id} : ${e}`);
                        return message.channel.send(new Discord.MessageEmbed()
                            .setColor('RED')
                            .setDescription(`An error occured while reseting.`)
                            .setTimestamp()
                            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                        );
                    });
                    break;
                }
                case 'autoModeration': {
                    const yn = await client.awaitReply(message, `Are you sure to reset Unicron\'s \`${key}\` for this server (yes/no)? _You have 15 seconds to comply_`, 15000);
                    if (!['y', 'yes', 'YES'].includes(yn)) return message.channel.send('Request terminated.');
                    const settings = db.moderation(true);
                    settings.autoModeration = false;
                    Promise.all([await settings.save()]).then(() => {
                        return message.channel.send(new Discord.MessageEmbed()
                            .setColor('RANDOM')
                            .setDescription(`Successfully reseted Unicron\'s \`${key}\` for this server.`)
                            .setTimestamp()
                            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                        );
                    }).catch(e => {
                        client.logger.error(`Error on reseting settings for ${message.guild.name}/${message.guild.id} : ${e}`);
                        return message.channel.send(new Discord.MessageEmbed()
                            .setColor('RED')
                            .setDescription(`An error occured while reseting.`)
                            .setTimestamp()
                            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                        );
                    });
                    break;
                }
                case 'autoModAction': {
                    const yn = await client.awaitReply(message, `Are you sure to reset Unicron\'s \`${key}\` for this server (yes/no)? _You have 15 seconds to comply_`, 15000);
                    if (!['y', 'yes', 'YES'].includes(yn)) return message.channel.send('Request terminated.');
                    const settings = db.moderation(true);
                    settings.autoModAction = 'WARN';
                    Promise.all([await settings.save()]).then(() => {
                        return message.channel.send(new Discord.MessageEmbed()
                            .setColor('RANDOM')
                            .setDescription(`Successfully reseted Unicron\'s \`${key}\` for this server.`)
                            .setTimestamp()
                            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                        );
                    }).catch(e => {
                        client.logger.error(`Error on reseting settings for ${message.guild.name}/${message.guild.id} : ${e}`);
                        return message.channel.send(new Discord.MessageEmbed()
                            .setColor('RED')
                            .setDescription(`An error occured while reseting.`)
                            .setTimestamp()
                            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                        );
                    });
                    break;
                }
                case 'maxWarnTreshold': {
                    const yn = await client.awaitReply(message, `Are you sure to reset Unicron\'s \`${key}\` for this server (yes/no)? _You have 15 seconds to comply_`, 15000);
                    if (!['y', 'yes', 'YES'].includes(yn)) return message.channel.send('Request terminated.');
                    const settings = db.moderation(true);
                    settings.maxWarnTreshold = Number(0);
                    Promise.all([await settings.save()]).then(() => {
                        return message.channel.send(new Discord.MessageEmbed()
                            .setColor('RANDOM')
                            .setDescription(`Successfully reseted Unicron\'s \`${key}\` for this server.`)
                            .setTimestamp()
                            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                        );
                    }).catch(e => {
                        client.logger.error(`Error on reseting settings for ${message.guild.name}/${message.guild.id} : ${e}`);
                        return message.channel.send(new Discord.MessageEmbed()
                            .setColor('RED')
                            .setDescription(`An error occured while reseting.`)
                            .setTimestamp()
                            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                        );
                    });
                    break;
                }
                case 'warnActionExpiresOn': {
                    const yn = await client.awaitReply(message, `Are you sure to reset Unicron\'s \`${key}\` for this server (yes/no)? _You have 15 seconds to comply_`, 15000);
                    if (!['y', 'yes', 'YES'].includes(yn)) return message.channel.send('Request terminated.');
                    const settings = db.moderation(true);
                    settings.warnActionExpiresOn = Number(0);
                    Promise.all([await settings.save()]).then(() => {
                        return message.channel.send(new Discord.MessageEmbed()
                            .setColor('RANDOM')
                            .setDescription(`Successfully reseted Unicron\'s \`${key}\` for this server.`)
                            .setTimestamp()
                            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                        );
                    }).catch(e => {
                        client.logger.error(`Error on reseting settings for ${message.guild.name}/${message.guild.id} : ${e}`);
                        return message.channel.send(new Discord.MessageEmbed()
                            .setColor('RED')
                            .setDescription(`An error occured while reseting.`)
                            .setTimestamp()
                            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                        );
                    });
                    break;
                }
                case 'warningExpiresOn': {
                    const yn = await client.awaitReply(message, `Are you sure to reset Unicron\'s \`${key}\` for this server (yes/no)? _You have 15 seconds to comply_`, 15000);
                    if (!['y', 'yes', 'YES'].includes(yn)) return message.channel.send('Request terminated.');
                    const settings = db.moderation(true);
                    settings.autoModeration = Number(0);
                    Promise.all([await settings.save()]).then(() => {
                        return message.channel.send(new Discord.MessageEmbed()
                            .setColor('RANDOM')
                            .setDescription(`Successfully reseted Unicron\'s \`${key}\` for this server.`)
                            .setTimestamp()
                            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                        );
                    }).catch(e => {
                        client.logger.error(`Error on reseting settings for ${message.guild.name}/${message.guild.id} : ${e}`);
                        return message.channel.send(new Discord.MessageEmbed()
                            .setColor('RED')
                            .setDescription(`An error occured while reseting.`)
                            .setTimestamp()
                            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                        );
                    });
                    break;
                }
                case 'memberVerification': {
                    const yn = await client.awaitReply(message, `Are you sure to reset Unicron\'s \`${key}\` for this server (yes/no)? _You have 15 seconds to comply_`, 15000);
                    if (!['y', 'yes', 'YES'].includes(yn)) return message.channel.send('Request terminated.');
                    const settings = db.verification(true);
                    settings.enabled = false;
                    Promise.all([await settings.save()]).then(() => {
                        return message.channel.send(new Discord.MessageEmbed()
                            .setColor('RANDOM')
                            .setDescription(`Successfully reseted Unicron\'s \`${key}\` for this server.`)
                            .setTimestamp()
                            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                        );
                    }).catch(e => {
                        client.logger.error(`Error on reseting settings for ${message.guild.name}/${message.guild.id} : ${e}`);
                        return message.channel.send(new Discord.MessageEmbed()
                            .setColor('RED')
                            .setDescription(`An error occured while reseting.`)
                            .setTimestamp()
                            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                        );
                    });
                    break;
                }
                case 'verificationChannel': {
                    const yn = await client.awaitReply(message, `Are you sure to reset Unicron\'s \`${key}\` for this server (yes/no)? _You have 15 seconds to comply_`, 15000);
                    if (!['y', 'yes', 'YES'].includes(yn)) return message.channel.send('Request terminated.');
                    const settings = db.verification(true);
                    settings.enabled = false;
                    settings.channel = '';
                    Promise.all([await settings.save()]).then(() => {
                        return message.channel.send(new Discord.MessageEmbed()
                            .setColor('RANDOM')
                            .setDescription(`Successfully reseted Unicron\'s \`${key}\` for this server.`)
                            .setTimestamp()
                            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                        );
                    }).catch(e => {
                        client.logger.error(`Error on reseting settings for ${message.guild.name}/${message.guild.id} : ${e}`);
                        return message.channel.send(new Discord.MessageEmbed()
                            .setColor('RED')
                            .setDescription(`An error occured while reseting.`)
                            .setTimestamp()
                            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                        );
                    });
                    break;
                }
                case 'verifiedRole': {
                    const yn = await client.awaitReply(message, `Are you sure to reset Unicron\'s \`${key}\` for this server (yes/no)? _You have 15 seconds to comply_`, 15000);
                    if (!['y', 'yes', 'YES'].includes(yn)) return message.channel.send('Request terminated.');
                    const settings = db.verification(true);
                    settings.enabled = false;
                    settings.role = '';
                    Promise.all([await settings.save()]).then(() => {
                        return message.channel.send(new Discord.MessageEmbed()
                            .setColor('RANDOM')
                            .setDescription(`Successfully reseted Unicron\'s \`${key}\` for this server.`)
                            .setTimestamp()
                            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                        );
                    }).catch(e => {
                        client.logger.error(`Error on reseting settings for ${message.guild.name}/${message.guild.id} : ${e}`);
                        return message.channel.send(new Discord.MessageEmbed()
                            .setColor('RED')
                            .setDescription(`An error occured while reseting.`)
                            .setTimestamp()
                            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                        );
                    });
                    break;
                }
                case 'verificationType': {
                    const yn = await client.awaitReply(message, `Are you sure to reset Unicron\'s \`${key}\` for this server (yes/no)? _You have 15 seconds to comply_`, 15000);
                    if (!['y', 'yes', 'YES'].includes(yn)) return message.channel.send('Request terminated.');
                    const settings = db.verification(true);
                    settings.type = 'discrim';
                    Promise.all([await settings.save()]).then(() => {
                        return message.channel.send(new Discord.MessageEmbed()
                            .setColor('RANDOM')
                            .setDescription(`Successfully reseted Unicron\'s \`${key}\` for this server.`)
                            .setTimestamp()
                            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                        );
                    }).catch(e => {
                        client.logger.error(`Error on reseting settings for ${message.guild.name}/${message.guild.id} : ${e}`);
                        return message.channel.send(new Discord.MessageEmbed()
                            .setColor('RED')
                            .setDescription(`An error occured while reseting.`)
                            .setTimestamp()
                            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                        );
                    });
                    break;
                }
                case 'inviteFilter': {
                    const yn = await client.awaitReply(message, `Are you sure to reset Unicron\'s \`${key}\` for this server (yes/no)? _You have 15 seconds to comply_`, 15000);
                    if (!['y', 'yes', 'YES'].includes(yn)) return message.channel.send('Request terminated.');
                    const settings = db.filters(true);
                    settings.inviteFilter = false;
                    Promise.all([await settings.save()]).then(() => {
                        return message.channel.send(new Discord.MessageEmbed()
                            .setColor('RANDOM')
                            .setDescription(`Successfully reseted Unicron\'s \`${key}\` for this server.`)
                            .setTimestamp()
                            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                        );
                    }).catch(e => {
                        client.logger.error(`Error on reseting settings for ${message.guild.name}/${message.guild.id} : ${e}`);
                        return message.channel.send(new Discord.MessageEmbed()
                            .setColor('RED')
                            .setDescription(`An error occured while reseting.`)
                            .setTimestamp()
                            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                        );
                    });
                    break;
                }
                case 'swearFilter': {
                    const yn = await client.awaitReply(message, `Are you sure to reset Unicron\'s \`${key}\` for this server (yes/no)? _You have 15 seconds to comply_`, 15000);
                    if (!['y', 'yes', 'YES'].includes(yn)) return message.channel.send('Request terminated.');
                    const settings = db.filters(true);
                    settings.swearFilter = false;
                    Promise.all([await settings.save()]).then(() => {
                        return message.channel.send(new Discord.MessageEmbed()
                            .setColor('RANDOM')
                            .setDescription(`Successfully reseted Unicron\'s \`${key}\` for this server.`)
                            .setTimestamp()
                            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                        );
                    }).catch(e => {
                        client.logger.error(`Error on reseting settings for ${message.guild.name}/${message.guild.id} : ${e}`);
                        return message.channel.send(new Discord.MessageEmbed()
                            .setColor('RED')
                            .setDescription(`An error occured while reseting.`)
                            .setTimestamp()
                            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                        );
                    });
                    break;
                }
                case 'mentionSpamFilter': {
                    const yn = await client.awaitReply(message, `Are you sure to reset Unicron\'s \`${key}\` for this server (yes/no)? _You have 15 seconds to comply_`, 15000);
                    if (!['y', 'yes', 'YES'].includes(yn)) return message.channel.send('Request terminated.');
                    const settings = db.filters(true);
                    settings.mentionSpamFilter = false;
                    Promise.all([await settings.save()]).then(() => {
                        return message.channel.send(new Discord.MessageEmbed()
                            .setColor('RANDOM')
                            .setDescription(`Successfully reseted Unicron\'s \`${key}\` for this server.`)
                            .setTimestamp()
                            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                        );
                    }).catch(e => {
                        client.logger.error(`Error on reseting settings for ${message.guild.name}/${message.guild.id} : ${e}`);
                        return message.channel.send(new Discord.MessageEmbed()
                            .setColor('RED')
                            .setDescription(`An error occured while reseting.`)
                            .setTimestamp()
                            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                        );
                    });
                    break;
                }
                default: {
                    return message.channel.send(new Discord.MessageEmbed()
                        .setColor('RED')
                        .setDescription('Error: Invalid Arguments')
                    );
                }
            }
        } else if (action === 'set') {
            switch (key) {
                case 'warnTresholdAction':
                case 'autoModAction': {
                    if (!['MUTE', 'KICK', 'SOFTBAN', 'BAN'].includes(value[0])) {
                        return message.channel.send(new Discord.MessageEmbed()
                            .setColor('RED')
                            .setTimestamp()
                            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                            .setDescription('TypeError: invalid type.\nActions: \`MUTE\`, \`KICK\`, \`SOFTBAN\`,\`BAN\`\nCASE SENSITIVE')
                        );
                    }
                    if (value[0] === 'MUTE' && !db.moderation('mutedRole')) {
                        return message.channel.send(new Discord.MessageEmbed()
                            .setColor('RED')
                            .setTimestamp()
                            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                            .setDescription('Error: Muted Role not setup, use \`config set mutedRole [RoleMention|RoleID|RoleName]\` to set it up and use this command again!')
                        );
                    }
                    const settings = db.moderation(true);
                    settings[key] = value[0];
                    Promise.all([await settings.save()]).then(() => {
                        return message.channel.send(new Discord.MessageEmbed()
                            .setColor('RANDOM')
                            .setDescription(`Successfully set \`${key}\` to \`${value[0]}\`.`)
                            .setTimestamp()
                            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                        );
                    }).catch(e => {
                        client.logger.error(`Error on setting configurations for ${message.guild.name}/${message.guild.id} : ${e}`);
                        return message.channel.send(new Discord.MessageEmbed()
                            .setColor('RED')
                            .setDescription(`An error occured while setting \`${key}\`.`)
                            .setTimestamp()
                            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                        );
                    });
                    break;
                }
                case 'prefix': {
                    if (value[0].length > 3) {
                        return message.channel.send(new Discord.MessageEmbed()
                            .setColor('RED')
                            .setDescription('Error: Prefix length must not exceed 3 characters.')
                            .setTimestamp()
                            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                        );
                    }
                    const settings = db.settings(true);
                    settings.prefix = value[0];
                    Promise.all([await settings.save()]).then(() => {
                        return message.channel.send(new Discord.MessageEmbed()
                            .setColor('RANDOM')
                            .setDescription(`Successfully set \`${key}\` to \`${value[0]}\`.`)
                            .setTimestamp()
                            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                        );
                    }).catch(e => {
                        client.logger.error(`Error on setting configurations for ${message.guild.name}/${message.guild.id} : ${e}`);
                        return message.channel.send(new Discord.MessageEmbed()
                            .setColor('RED')
                            .setDescription(`An error occured while setting \`${key}\`.`)
                            .setTimestamp()
                            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                        );
                    });
                    break;
                }
                case 'modLogChannel': {
                    const channel = message.mentions.channels.first() || message.guild.channels.cache.get(value[0]) || message.guild.channels.cache.find(c => c.name === value[0]);
                    if (!channel) {
                        return message.channel.send(new Discord.MessageEmbed()
                            .setColor('RED')
                            .setDescription(`Incorrect Arguments: Use \`config set ${key} [ChannelMention|ChannelID|ChannelName]\``)
                            .setTimestamp()
                            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                        );
                    }
                    if (!channel.permissionsFor(message.guild.me).has(['SEND_MESSAGES'])) {
                        return message.channel.send(new Discord.MessageEmbed()
                            .setColor('RED')
                            .setDescription(`Error: Unicron doesn't have access to that channel`)
                            .setTimestamp()
                            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                        );
                    }
                    const settings = db.moderation(true);
                    settings.modLogChannel = channel.id;
                    Promise.all([await settings.save()]).then(() => {
                        channel.send(`${key} synced`);
                        return message.channel.send(new Discord.MessageEmbed()
                            .setColor('RANDOM')
                            .setDescription(`Successfully set \`${key}\` to <#${channel.id}>.`)
                            .setTimestamp()
                            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                        );
                    }).catch(e => {
                        client.logger.error(`Error on setting configurations for ${message.guild.name}/${message.guild.id} : ${e}`);
                        return message.channel.send(new Discord.MessageEmbed()
                            .setColor('RED')
                            .setDescription(`An error occured while setting \`${key}\`.`)
                            .setTimestamp()
                            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                        );
                    });
                    break;
                }
                case 'autoModeration': {
                    if (!['on', 'off'].includes(value[0])) {
                        return message.channel.send(new Discord.MessageEmbed()
                            .setColor('RED')
                            .setDescription(`Incorrect Arguments: Use \`config set ${key} [on|off]\``)
                            .setTimestamp()
                            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                        );
                    }
                    const bool = (value[0] === 'on') ? true : false;
                    const settings = db.moderation(true);
                    settings.autoModeration = bool;
                    Promise.all([await settings.save()]).then(() => {
                        return message.channel.send(new Discord.MessageEmbed()
                            .setColor('RANDOM')
                            .setDescription(`Successfully set \`${key}\` to \`${bool ? 'on' : 'off'}\`.`)
                            .setTimestamp()
                            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                        );
                    }).catch(e => {
                        client.logger.error(`Error on setting configurations for ${message.guild.name}/${message.guild.id} : ${e}`);
                        return message.channel.send(new Discord.MessageEmbed()
                            .setColor('RED')
                            .setDescription(`An error occured while setting \`${key}\`.`)
                            .setTimestamp()
                            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                        );
                    });
                    break;
                }
                case 'maxWarnTreshold': {
                    const time = value[0];
                    if (isNaN(time)) {
                        return message.channel.send(new Discord.MessageEmbed()
                            .setColor('RED')
                            .setDescription(`Incorrect Arguments: Use \`config set ${key} [Number]\``)
                            .setTimestamp()
                            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                        );
                    }
                    const settings = db.moderation(true);
                    settings.maxWarnTreshold = Number(time);
                    Promise.all([await settings.save()]).then(() => {
                        return message.channel.send(new Discord.MessageEmbed()
                            .setColor('RANDOM')
                            .setDescription(`Successfully set \`${key}\` to \`${time}\`.`)
                            .setTimestamp()
                            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                        );
                    }).catch(e => {
                        client.logger.error(`Error on setting configurations for ${message.guild.name}/${message.guild.id} : ${e}`);
                        return message.channel.send(new Discord.MessageEmbed()
                            .setColor('RED')
                            .setDescription(`An error occured while setting \`${key}\`.`)
                            .setTimestamp()
                            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                        );
                    });
                    break;
                }
                case 'warningExpiresOn':
                case 'warnActionExpiresOn': {
                    const num = ms(value[0]);
                    if (isNaN(num)) {
                        return message.channel.send(new Discord.MessageEmbed()
                            .setColor('RED')
                            .setDescription(`Incorrect or Invalid Arguments: Use \`config set ${key} [Duration]\``)
                            .setTimestamp()
                            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                        );
                    }
                    const settings = db.moderation(true);
                    settings[key] = num;
                    Promise.all([await settings.save()]).then(() => {
                        return message.channel.send(new Discord.MessageEmbed()
                            .setColor('RANDOM')
                            .setDescription(`Successfully set \`${key}\` to \`${ms(num)}\`.`)
                            .setTimestamp()
                            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                        );
                    }).catch(e => {
                        client.logger.error(`Error on setting configurations for ${message.guild.name}/${message.guild.id} : ${e}`);
                        return message.channel.send(new Discord.MessageEmbed()
                            .setColor('RED')
                            .setDescription(`An error occured while setting \`${key}\`.`)
                            .setTimestamp()
                            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                        );
                    });
                    break;
                }
                case 'swearFilter':
                case 'mentionSpamFilter':
                case 'inviteFilter': {
                    if (!['on', 'off'].includes(value[0])) {
                        return message.channel.send(new Discord.MessageEmbed()
                            .setColor('RED')
                            .setDescription(`Incorrect Arguments: Use \`config set ${key} [on|off]\``)
                            .setTimestamp()
                            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                        );
                    }
                    const bool = (value[0] === 'on') ? true : false;
                    const settings = db.filters(true);
                    settings[key] = bool;
                    Promise.all([await settings.save()]).then(() => {
                        return message.channel.send(new Discord.MessageEmbed()
                            .setColor('RANDOM')
                            .setDescription(`Successfully set \`${key}\` to \`${bool ? 'on' : 'off'}\`.`)
                            .setTimestamp()
                            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                        );
                    }).catch(e => {
                        client.logger.error(`Error on setting configurations for ${message.guild.name}/${message.guild.id} : ${e}`);
                        return message.channel.send(new Discord.MessageEmbed()
                            .setColor('RED')
                            .setDescription(`An error occured while setting \`${key}\`.`)
                            .setTimestamp()
                            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                        );
                    });
                    break;
                }
                default: {
                    return message.channel.send(new Discord.MessageEmbed()
                        .setColor('RED')
                        .setDescription('Error: Invalid Key provided')
                    );
                }
            }
        }
    }
}