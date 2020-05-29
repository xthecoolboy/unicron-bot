
const Discord = require('discord.js');

const { Admin } = require('../../database/database');
const { token } = require('../../handlers/Unicron');
const { Crypto } = require('../../utils/');

const evaluation = async function (client, message, [key, ...value]) {
    try {
        switch (message.flags.shift()) {
            case 'setPresence': {
                const status = key;
                const type = value.shift();
                const message = value.join(' ')
                client.user.setPresence({ activity: { name: message, type: type }, status: status });
                return;
            }
            case 'codes': {
                const action = message.flags.shift();
                const table = message.flags.shift();
                const code = value[0] ? value[0] : token();
                if (!table) return false;
                let model = await client.unicron.database(table, true);
                if (!action) return false;
                if (!model.data || !Array.isArray(model.data)) model.data = [];
                switch (action) {
                    case 'add': {
                        model.data.push(Crypto({ text: code, hash: 'sha256', salt: 'oadpoaw' }));
                        await Admin.update({ data: model.data }, { where: { table: table } });
                        return code;
                    }
                    case 'remove': {
                        // TODO
                        model.data = model.data.filter((item) => { return item !== Crypto({ text: code, hash: 'sha256', salt: 'oadpoaw' }); });
                        await Admin.update({ data: model.data }, { where: { table: table } });
                        return true;
                    }
                    case 'regenerate': {
                        if (!isNaN(code)) return false;
                        let codes = [];
                        for (var i = 0; i < code; i++) {
                            codes.push(token());
                        }
                        await codes.forEach((item) => {
                            model.data.push(Crypto({ text: item, hash: 'sha256', salt: 'oadpoaw' }));
                        });
                        await Admin.update({ data: model.data }, { where: { table: table } });
                        return codes.map((item) => `${item}`).join('\n');
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
                const table = message.flags.shift();
                const action = message.flags.shift();
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
        \`-codes [-add|-remove|-regenerate|-fetch] [-user|-guild] [name]\`
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