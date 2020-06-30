const User = require('../../classes/User');
const { Message } = require('discord.js');
const Client = require('../../classes/Unicron');
const { Admin } = require('../../database/database');
const BaseCommand = require('../../classes/BaseCommand');
const { Random } = require('../../utils');

const token = function () {
    return Random.string(16);
}

function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}

function encrypt(str) {
    return str;
}
/**
 * 
 * @param {Client} client Client
 * @param {Message} message Message
 * @param {Array<String>} args Arguments
 */
const evaluation = async function (client, message, [key, ...value]) {
    try {
        switch (message.flags[0]) {
            case 'setPresence': {
                const status = key;
                const type = value.shift().toUpperCase();
                const message = value.join(' ');
                client.shard.broadcastEval(`this.user.setPresence({ activity: { name: ${message}, type: ${type} }, status: ${status} })`)
                return;
            }
            case 'codes': {
                const action = message.flags[1];
                const table = message.flags[2];
                const code = key || token();
                if (!table) return false;
                let model = await client.unicron.database(table, true);
                if (!action) return false;
                if (!model.data || !Array.isArray(model.data)) model.data = [];
                switch (action) {
                    case 'add': {
                        const cd = encrypt(code);
                        model.data.push(cd);
                        await Admin.update({ data: model.data }, { where: { table: table } });
                        return code;
                    }
                    case 'remove': {
                        const cd = encrypt(code);
                        if (!model.data.includes(cd)) return false;
                        await Admin.update({ data: removeItemOnce(model.data, cd) }, { where: { table: table } });
                        return true;
                    }
                    default:
                        return false;
                }
            }
            case 'staff':
            case 'partner':
            case 'bug_hunter':
            case 'developer':
            case 'supporter': {
                const table = message.flags[0];
                const action = message.flags[1];
                const id = key;
                const USER = new User(id);
                const reason = value.join(' ') || 'No reason provided.';
                let model = await client.unicron.database(table, true);
                if (!id) return false;
                if (!action) return false;
                if (!model.data || !Array.isArray(model.data)) model.data = [];
                switch (action) {
                    case 'add': {
                        model.data.push({
                            id: id,
                            reason: reason,
                            when: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
                        });
                        if (!await USER.badges.has(message.flags[0])) await USER.badges.add(message.flags[0]);
                        await Admin.update({ data: model.data }, { where: { table: table } });
                        return true;
                    }
                    case 'remove': {
                        model.data = model.data.filter((item) => item.id !== id);
                        if (await USER.badges.has(message.flags[0])) await USER.badges.remove(message.flags[0]);
                        await Admin.update({ data: model.data }, { where: { table: table } });
                        return true;
                    }
                    case 'fetch': {
                        const data = model.data.find((item) => { return item.id === id });
                        if (!data) return false;
                        return `User: ${await client.users.resolve(id).tag} / ${id}\nReason: ${data.reason}\nDate: ${data.when}`;
                    }
                    case 'fetchAll': {
                        let msg = '';
                        for (const user of model.data) {
                            msg += `${client.users.resolve(user.id)} / ${user.id}\n`;
                        }
                        return msg ? msg : false;
                    }
                    default:
                        return false;
                }
            }
            default:
                return false;
        }
    } catch (e) {
        return e;
    }
}
module.exports = class extends BaseCommand {
    constructor() {
        super({
            config: {
                name: 'root',
                description: `Root Command.
\`\`\`bash
$ root -setPresence [Status] [Activity] [...Message]
$ root -staff [-add|-remove|-fetch|-fetchAll] [UserID] [...Reason]
$ root -partner [-add|-remove|-fetch|-fetchAll] [UserID] [...Reason]
$ root -bug_hunter [-add|-remove|-fetch|-fetchAll] [UserID] [...Reason]
$ root -supporter [-add|-remove|-fetch|-fetchAll] [UserID] [...Reason]
$ root -codes [-add|-remove|-fetch] [-user|-guild] [name]\`
\`\`\`
`,
                permission: 'Bot Owner',
            },
            options: {
                aliases: ['dev'],
                cooldown: 3,
                nsfwCommand: false,
                args: true,
                usage: 'root [Flags] [...values]',
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
        return message.channel.send(`\`Output:\`\n\`\`\`xl\n${await evaluation(client, message, args)}\n\`\`\`\n`);
    }
}