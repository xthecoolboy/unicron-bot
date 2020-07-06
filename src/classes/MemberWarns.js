
const { GuildMember } = require('../database/database');

module.exports = class MemberWarns {
    constructor(Member) {
        this.id = Member.id;
        this.guild_id = Member.guild_id;
    }
    /**
     * ```js
     * message.member.warnings.add({ 
     *      reason: "HakDog",
     *      issued_by: "what sstafff",
     * });
     * ```
     * ```json
     * // Examples
     * {
     *      "reason": "No reason provided.",
     *      "issued_by": "Staff_SnowFlake",
     * }
     * ```
     * @param {JSON} value Value
     * @returns {Promise<number>} case number
     */
    add(value) {
        return new Promise(async (resolve, reject) => {
            let loser = await GuildMember.findOne({ where: { guild_id: this.guild_id, member_id: this.id } });
            if (!loser) loser = await GuildMember.create({ guild_id: this.guild_id, member_id: this.id });
            if (!loser.data) loser.data = {};
            if (!loser.data.warningCount) loser.data.warningCount = 1;
            value.case = loser.data.warningCount;
            value.when = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
            loser.data.warningCount++;
            await (loser.data['warnings'] || (loser.data['warnings'] = [])).push(value);
            await GuildMember.update({ data: loser.data }, { where: { guild_id: this.guild_id, member_id: this.id } });
            return resolve(value.case ? value.case : 1);
        });
    }
    /**
     * 
     * @param {number} case_number Case number
     * @returns {Promise<boolean>}
     */
    remove(case_number) {
        return new Promise(async (resolve, reject) => {
            let loser = await GuildMember.findOne({ where: { guild_id: this.guild_id, member_id: this.id } });
            if (!loser) loser = await GuildMember.create({ guild_id: this.guild_id, member_id: this.id });
            if (!loser.data) return resolve(false);
            if (!loser.data['warnings']) return resolve(false);
            const copy = loser.data['warnings'].filter((item) => { return item.case !== case_number });
            loser.data['warnings'] = copy;
            await GuildMember.update({ data: loser.data }, { where: { guild_id: this.guild_id, member_id: this.id } });
            return resolve(true);
        });
    }
    /**
     * 
     * @param {number} case_number Case number
     * @returns {Promise<JSON|boolean>}
     */
    fetch(case_number) {
        return new Promise(async (resolve, reject) => {
            let loser = await GuildMember.findOne({ where: { guild_id: this.guild_id, member_id: this.id } });
            if (!loser) loser = await GuildMember.create({ guild_id: this.guild_id, member_id: this.id });
            if (!loser.data || !loser.data['warnings']) return resolve(false);
            const ret = loser.data['warnings'].filter((item) => { return item.case === case_number });
            return resolve(ret ? ret : false);
        });
    }
    /**
     * Fetches all Member's Warns
     * @returns {Promise<Array<JSON>>}
     */
    fetchAll() {
        return new Promise(async (resolve, reject) => {
            let loser = await GuildMember.findOne({ where: { guild_id: this.guild_id, member_id: this.id } });
            if (!loser) loser = await GuildMember.create({ guild_id: this.guild_id, member_id: this.id });
            if (!loser.data) return resolve([]);
            return resolve(loser.data['warnings'] ? loser.data['warnings'] : []);
        });
    }
    /**
     * Clears Member's Warns
     */
    destroy() {
        return new Promise(async (resolve, reject) => {
            let loser = await GuildMember.findOne({ where: { guild_id: this.guild_id, member_id: this.id } });
            if (!loser) loser = await GuildMember.create({ guild_id: this.guild_id, member_id: this.id });
            if (!loser.data) loser.data = {};
            loser.data['warnings'] = [];
            return resolve(await GuildMember.update({ data: loser.data }, { where: { guild_id: this.guild_id, member_id: this.id } }));
        });

    }
}