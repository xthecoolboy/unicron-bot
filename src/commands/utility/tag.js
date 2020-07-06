
const { MessageEmbed, Message } = require('discord.js');
const Client = require('../../classes/Unicron');
const BaseCommand = require('../../classes/BaseCommand');

module.exports = class extends BaseCommand {
    constructor() {
        super({
            config: {
                name: 'tag',
                description: `Create a tag, delete a tag, edit a tag, show a tag, list all tags
Creating/Removing/Editing a tag requires permission level \`Server Moderator\`
\`\`\`html
tag <Tag Name>
{PREFIX}<Tag Name>
tag list
tag <create|edit> <Tag Name> <...Value>
tag delete <Tag Name>
\`\`\`
`,
                permission: 'User',
            },
            options: {
                aliases: ['tags'],
                cooldown: 3,
                args: true,
                usage: `tag <Tag name>\ntag <create|edit|delete|list> <Tag name> <...value>`,
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
        if (message.author.permLevel >= 2) {
            switch (action) {
                case 'create': {
                    if (action === key || 'edit' === key || 'delete' === key || 'list' === key) {
                        return message.channel.send(new MessageEmbed()
                            .setColor('RED')
                            .setDescription('Sorry, you can\'t create a tag named \`create\`, \`edit\`, \`list\` or \`delete\`.'))
                    }
                    const msg = await message.guild.db.tags({ action: 'create', name: key, value: value.join(' ') });
                    return message.channel.send(new MessageEmbed()
                        .setColor('RANDOM')
                        .setDescription(msg)
                    );
                }
                case 'edit': {
                    const msg = await message.guild.db.tags({ action: 'edit', name: key, newValue: value.join(' ') });
                    return message.channel.send(new MessageEmbed()
                        .setColor('RANDOM')
                        .setDescription(msg)
                    );
                }
                case 'delete': {
                    const msg = await message.guild.db.tags({ action: 'remove', name: key });
                    return message.channel.send(new MessageEmbed()
                        .setColor('RANDOM')
                        .setDescription(msg)
                    );
                }
                default: {
                    break;
                }
            }
        }
        switch (action) {
            case 'create':
            case 'edit':
            case 'delete': {
                return message.channel.send(new MessageEmbed()
                    .setColor('RED')
                    .setDescription(`Sorry, You do not have the permissions to create/edit/delete a tag :P`)
                );
            }
            case 'list': {
                const msg = await message.guild.db.tags();
                return message.channel.send(new MessageEmbed()
                    .setColor('RANDOM')
                    .setAuthor(message.guild.name, message.guild.iconURL() || null)
                    .setTitle('Server Tags')
                    .setDescription(msg)
                    .setTimestamp()
                );
            }
            default: {
                let msg = await message.guild.db.tags({ action: 'fetch', name: action });
                if (msg === '[TAG_DOESNT_EXISTS]') {
                    msg = 'Sorry, That tag does not exist';
                }
                return message.channel.send(await msg.replace(/@/g, '@' + String.fromCharCode(8203)));
            }
        }
    }
}