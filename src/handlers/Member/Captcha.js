const Base = require('../../classes/Base');
const { GuildMember } = require('../../database/database');

const { Random } = require('../../utils');

class Captcha extends Base {
    constructor(id, guild_id) {
        super(id);
        this.guild_id = guild_id;
    }
    generate() {
        return new Promise(async (resolve, reject) => {
            const [user,] = await GuildMember.findOrCreate({ where: { guild_id: this.guild_id, member_id: this.id } });
            if (!user.data) user.data = {};
            user.data['captcha'] = Random.string(6);
            return resolve(user.save());
        });

    }
    regenerate() {
        return new Promise(async (resolve, reject) => {
            const [user,] = await GuildMember.findOrCreate({ where: { guild_id: this.guild_id, member_id: this.id } });
            if (!user.data) user.data = {};
            user.data['captcha'] = Random.string(6);
            return resolve(user.save());
        });
    }
    fetch() {
        return new Promise(async (resolve, reject) => {
            const [user,] = await GuildMember.findOrCreate({ where: { guild_id: this.guild_id, member_id: this.id } });
            if (!user.data) user.data = {};
            if (!user.data['captcha']) {
                user.data['captcha'] = Random.string(6);
                user.save();
            };
            return resolve(user.data['captcha']);
        });
    }
    destroy() {
        return new Promise(async (resolve, reject) => {
            const [user,] = await GuildMember.findOrCreate({ where: { guild_id: this.guild_id, member_id: this.id } });
            if (!user.data) user.data = {};
            user.data['captcha'] = '';
            return resolve(await GuildWarns.update({ data: user.data }, { where: { guild_id: this.guild_id, member_id: this.id } }));
        });

    }
}

module.exports = Captcha;