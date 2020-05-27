
const { MessageEmbed } = require('discord.js');

module.exports = {
    run: async function (client, message, [action, key, ...value]) {
        if (message.author.permLevel >= client.levelCache['Server Moderator']) {
            switch (action) {
                case 'create': {
                    if (action === key || 'edit' === key || 'delete' === key) {
                        return message.channel.send(new MessageEmbed()
                            .setColor('RED')
                            .setDescription('Sorry, you can\'t create a tag named \`create\`, \`edit\` or \`delete\`.'))
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
                    .setDescription(`You do not have the permissions to create/edit/delete a tag.`)
                );
            }
            case 'list': {
                const msg = await message.guild.db.tags();
                return message.channel.send(new MessageEmbed()
                    .setColor('RANDOM')
                    .setDescription(msg)
                );
            }
            default: {
                let msg = await message.guild.db.tags({ action: 'fetch', name: action });
                if (msg === '[TAG_DOESNT_EXISTS]') {
                    msg = 'Sorry, That tag does not exist';
                }
                return message.channel.send(new MessageEmbed()
                    .setColor('RANDOM')
                    .setDescription(msg)
                );

            }
        }
    },
    config: {
        name: 'tag',
        description: `Create a tag, delete a tag, edit a tag, show a tag, list all tags
                    Creating/Removing/Editing a tag requires Moderator Permissions`,
        permission: 'User',
    },
    options: {
        aliases: ['tags'],
        cooldown: 3,
        args: true,
        usage: `tag [name]\ntag [create/edit/delete/list] [key/name] [...value]\ntag list\ntag create Test Wonderful Wonderful\ntag edit Test New Value asdnasd\ntag delete Test`,
        donatorOnly: false,
    }
}