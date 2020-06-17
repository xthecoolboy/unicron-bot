const { GuildMember } = require('../database/database');

const { Random } = require('../utils');

module.exports =  class MemberCaptcha {
    constructor(Member) {
        this.id = Member.id;
        this.guild_id = Member.guild_id;
    }
    /**
     * @returns {}
     */
    generate() {
        return new Promise(async (resolve, reject) => {
            let user = await GuildMember.findOne({ where: { guild_id: this.guild_id, member_id: this.id } });
            if (!user) user = await GuildMember.create({ guild_id: this.guild_id, member_id: this.id });
            if (!user.data) user.data = {};
            user.data['captcha'] = Random.string(6);
            return resolve(await user.save());
        });

    }
    regenerate() {
        return new Promise(async (resolve, reject) => {
            let user = await GuildMember.findOne({ where: { guild_id: this.guild_id, member_id: this.id } });
            if (!user) user = await GuildMember.create({ guild_id: this.guild_id, member_id: this.id });
            if (!user.data) user.data = {};
            user.data['captcha'] = Random.string(6);
            return resolve(await user.save());
        });
    }
    fetch() {
        return new Promise(async (resolve, reject) => {
            let user = await GuildMember.findOne({ where: { guild_id: this.guild_id, member_id: this.id } });
            if (!user) user = await GuildMember.create({ guild_id: this.guild_id, member_id: this.id });
            if (!user.data) user.data = {};
            if (!user.data['captcha']) {
                user.data['captcha'] = Random.string(6);
                await user.save();
            };
            return resolve(user.data['captcha']);
        });
    }
    destroy() {
        return new Promise(async (resolve, reject) => {
            let user = await GuildMember.findOne({ where: { guild_id: this.guild_id, member_id: this.id } });
            if (!user) user = await GuildMember.create({ guild_id: this.guild_id, member_id: this.id });
            if (!user.data) user.data = {};
            user.data['captcha'] = '';
            return resolve(await GuildWarns.update({ data: user.data }, { where: { guild_id: this.guild_id, member_id: this.id } }));
        });
    }
}