
const Base = require('../classes/Base');
const { GuildMember } = require('../database/database');

const Warnings = require('./Member/Warnings');
const Captcha = require('./Member/Captcha');

class Member extends Base {
    constructor(id, guild_id) {
        super(id);
        this.guild_id = guild_id;
        this.warnings = new Warnings(id, guild_id);
        this.captcha = new Captcha(id, guild_id);
    }
    destroy() {
        GuildMember.destroy({ where: { guild_id: this.guild_id, member_id: this.id}});
    }
}

module.exports = Member;