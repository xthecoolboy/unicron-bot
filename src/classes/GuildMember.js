const Base = require('./Base');

const { GuildMember } = require('../database/database');

const MemberCaptcha = require('./MemberCaptcha');
const MemberWarns = require('./MemberWarns');

module.exports = class Member extends Base {
    /**
     * 
     * @param {string} id 
     * @param {string} guild_id 
     */
    constructor(id, guild_id) {
        super(id);
        this.guild_id = guild_id;
        this.captcha = new MemberCaptcha(this);
        this.warnings = new MemberWarns(this);
    }
    async destroy() {
        await GuildMember.destroy({ where: { guild_id: this.guild_id, member_id: this.id } });
    }
}