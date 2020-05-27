const Base = require('../../classes/Base');
const { GuildMember } = require('../../database/database');

const { Random } = require('../../utils');

class Captcha extends Base {
    constructor(id, guild_id) {
        super(id);
        this.guild_id = guild_id;
    }
    async generate() {
        const [user,] = await GuildMember.findOrCreate({ where: { guild_id: this.guild_id, member_id: this.id } });
        if (!user.data) user.data = {};
        user.data['captcha'] = Random.string(6);
        user.save();
    }
    async regenerate() {
        const [user,] = await GuildMember.findOrCreate({ where: { guild_id: this.guild_id, member_id: this.id } });
        if (!user.data) user.data = {};
        user.data['captcha'] = Random.string(6);
        user.save();
    }
    async fetch() {
        const [user,] = await GuildMember.findOrCreate({ where: { guild_id: this.guild_id, member_id: this.id } });
        if (!user.data) user.data = {};
        if (!user.data['captcha']) {
            user.data['captcha'] = Random.string(6);
            user.save();
        };
        return user.data['captcha'];
    }
    destroy() {
        const [user,] = await GuildMember.findOrCreate({ where: { guild_id: this.guild_id, member_id: this.id } });
        if (!user.data) user.data = {};
        user.data['captcha'] = '';
        await GuildWarns.update({ data: user.data }, { where: { guild_id: this.guild_id, member_id: this.id } });
    }
}

module.exports = Captcha;