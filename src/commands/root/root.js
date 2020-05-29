
const Discord = require('discord.js');

const { Admin } = require('../../database/database');
const { token } = require('../../handlers/Unicron');
const { Crypto } = require('../../utils/');

function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}

function encrypt(str) {
    return Crypto({ text: str, hash: 'sha256', salt: 'oadpoaw'});
}

const evaluation = async function (client, message, [key, ...value]) {
    try {
        switch (message.flags[0]) {
            case 'setPresence': {
                const status = key;
                const type = value.shift();
                const message = value.join(' ')
                client.user.setPresence({ activity: { name: message, type: type }, status: status });
                return;
            }
            case 'codes': {
                const action = message.flags[1];
                const table = message.flags[2];
                const code = value.shift() || token();
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
            case 'moderator':
            case 'admin':
            case 'partner':
            case 'tester':
            case 'supporter': {
                const table = message.flags[1];
                const action = message.flags[2];
                const id = value.shift();
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
                        await Admin.update({ data: model.data }, { where: { table: table } });
                        return true;
                    }
                    case 'remove': {
                        model.data = model.data.filter((item) => item.id !== id);
                        await Admin.update({ data: mode.data }, { where: { table: table } });
                        return true;
                    }
                    case 'fetch': {
                        const data = model.data.find((item) => { return item.id === id });
                        if (!data) return false;
                        return `User: ${await client.users.resolve(id).tag} / ${id}\nReason: ${data.reason}\nDate: ${date.when}`;
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

module.exports = {
    /**
     * 
     * @param {Discord.Client} client Client
     * @param {Discord.Message} message Message
     * @param {Array} args Arguments
     */
    run: async function (client, message, args) {
        message.channel.send(`\`Output:\`\n\`\`\`xl\n${await evaluation(client, message, args)}\n\`\`\`\n`);
    },
    /**
        \`-setPresence [Status] [Activity] [...Message]\`
        \`-moderator [-add|-remove|-fetch|-fetchAll] [UserID] [...Reason]\`
        \`-admin [-add|-remove|-fetch|-fetchAll] [UserID] [...Reason]\`
        \`-partner [-add|-remove|-fetch|-fetchAll] [UserID] [...Reason]\`
        \`-tester [-add|-remove|-fetch|-fetchAll] [UserID] [...Reason]\`
        \`-supporter [-add|-remove|-fetch|-fetchAll] [UserID] [...Reason]\`
        \`-codes [-add|-remove|-fetch] [-user|-guild] [OK] [name]\`
     */
    config: {
        name: 'root',
        description: `Root Command.`,
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
}