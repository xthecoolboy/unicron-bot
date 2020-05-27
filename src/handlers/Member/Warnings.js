
const Base = require('../../classes/Base');
const { GuildMember } = require('../../database/database');

class Warnings extends Base {
    constructor(id, guild_id) {
        super(id);
        this.guild_id = guild_id;
    }
    /**
     * ```js
     * message.member.warnings.add({ 
     *      reason: "HakDog",
     *      issued_by: "what sstafff",
     *      issued_at: Date.now()}
     * );
     * ```
     * ```json
     * // Examples
     * {
     *      "reason": "No reason provided.",
     *      "issued_by": "Staff_SnowFlake",
     *      "issued_at": Date.now()
     * }
     * ```
     * @param {JSON} value Value
     */
    async add(value) {
        const [loser,] = await GuildMember.findOrCreate({ where: { guild_id: this.id, member_id: this.id } });
        if (!loser.data) loser.data = { warningCount: 0 };
        loser.data.warningCount++;
        value.case = loser.data.warningCount;
        (loser.data['warnings'] || (loser.data['warnings'] = [])).push(value);
        loser.save();
        return true;
    }
    /**
     * 
     * @param {Number} case_number Case Number
     */
    async remove(case_number) {
        const [loser,] = await GuildMember.findOrCreate({ where: { guild_id: this.guild_id, member_id: this.id } });
        if (!loser.data) return false;
        if (!loser.data['warnings']) return false;
        const copy = loser.data['warnings'].filter((item) => { return item.case !== case_number});
        loser.data['warnings'] = copy;
        loser.save();
        return true;
    }
    /**
     * 
     * @param {Number} case_number Case Number
     */
    async fetch(case_number) {
        const [loser,] = await GuildMember.findOrCreate({ where: { guild_id: this.guild_id, member_id: this.id } });
        if (!loser.data) return false;
        if (!loser.data['warnings']) return false;
        const ret = loser.data['warnings'].filter((item) => { return item.case === case_number});
        return  ret ? ret : false;
    }
    /**
     * Fetches all Member Warns
     */
    async fetchAll() {
        const [loser,] = await GuildMember.findOrCreate({ where: { guild_id: this.guild_id, member_id: this.id } });
        if (!loser.data) return false;
        return loser.data['warnings'] ? loser.data['warnings'] : [];
    }
    /**
     * Clears Member's Warns
     */
    destroy() {
        const [loser,] = await GuildMember.findOrCreate({ where: { guild_id: this.guild_id, member_id: this.id } });
        if (!loser.data) loser.data = {};
        loser.data['warnings'] = [];
        GuildWarns.update({ data: loser.data }, { where: { guild_id: this.guild_id, member_id: this.id } });
    }
}

module.exports = Warnings;