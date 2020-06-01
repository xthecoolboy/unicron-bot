
const {
    GuildSettings,
    GuildDynamicVoice,
    GuildFilter,
    GuildLeave,
    GuildWelcome,
    GuildModeration,
    GuildTags,
    GuildTicket,
    GuildVerification,
    GuildMember,
} = require('../database/database.js');

const Base = require('../classes/Base');

class Guild extends Base {
    /**
     * 
     * @param {String} _id 
     */
    constructor(id) {
        super(id);
    }
    /**
     * 
     * @brief Reset/Delete Guild's Data from Unicron's Database
     */
    destroy(includeTags = true, includeMembers = true) {
        if (includeTags) this.tags({ action: 'reset' });
        if (includeMembers) GuildMember.destroy({ where: { guild_id: this.id } });
        GuildSettings.destroy({ where: { guild_id: this.id } });
        GuildModeration.destroy({ where: { guild_id: this.id } });
        GuildTicket.destroy({ where: { guild_id: this.id } });
        GuildFilter.destroy({ where: { guild_id: this.id } });
        GuildWelcome.destroy({ where: { guild_id: this.id } });
        GuildLeave.destroy({ where: { guild_id: this.id } });
        GuildVerification.destroy({ where: { guild_id: this.id } });
        GuildDynamicVoice.destroy({ where: { guild_id: this.id } });
    }
    /**
     * Values:
     * * prefix
     * * premium
     * * data
     * @param {String|Boolean} value Search value
     */
    settings(value) {
        return new Promise(async (resolve, reject) => {
            const [retval,] = await GuildSettings.findOrCreate({ where: { guild_id: this.id } });
            if (typeof value === "boolean") {
                return resolve(retval);
            }
            return resolve(retval[value]);
        });
    }
    /**
     * Values:
     * * category
     * * waitingRoom
     * * data
     * * enabled
     * @param {String|Boolean} value Search value
     */
    dynamicVoice(value) {
        return new Promise(async (resolve, reject) => {
            const [retval,] = await GuildDynamicVoice.findOrCreate({ where: { guild_id: this.id } });
            if (typeof value === "boolean") {
                return resolve(retval);
            }
            return resolve(retval[value]);
        });
    }
    /**
     * Values:
     * * channel
     * * role
     * * type
     * * enabled
     * @param {String|Boolean} value Search value
     */
    verification(value) {
        return new Promise(async (resolve, reject) => {
            const [retval,] = await GuildVerification.findOrCreate({ where: { guild_id: this.id } });
            if (typeof value === "boolean") {
                return resolve(retval);
            }
            return resolve(retval[value]);
        });

    }
    /**
     * Values:
     * * category
     * * data
     * * enabled
     * @param {String|Boolean} value Search value
     */
    ticket(value) {
        return new Promise(async (resolve, reject) => {
            const [retval,] = await GuildTicket.findOrCreate({ where: { guild_id: this.id } });
            if (typeof value === "boolean") {
                return resolve(retval);
            }
            return resolve(retval[value]);
        });

    }
    /**
     * Values:
     * * data
     * * moderatorRole
     * * adminRole
     * * mutedRole
     * * modLogChannel
     * * autoModeration
     * * autoModAction
     * * maxWarnTreshhold
     * * warnTresholdAction
     * * warnActionExpiresOn
     * * warningExpiresOn
     * @param {String|Boolean} value Search value
     */
    moderation(value) {
        return new Promise(async (resolve, reject) => {
            const [retval,] = await GuildModeration.findOrCreate({ where: { guild_id: this.id } });
            if (typeof value === "boolean") {
                return resolve(retval);
            }
            return resolve(retval[value]);
        });

    }
    /**
     * Values:
     * * inviteFilter
     * * swearFilter
     * * mentionSpamFilter
     * * data
     * @param {String|Boolean} value Search value
     */
    filters(value) {
        return new Promise(async (resolve, reject) => {
            const [retval,] = await GuildFilter.findOrCreate({ where: { guild_id: this.id } });
            if (typeof value === "boolean") {
                return resolve(retval);
            }
            return resolve(retval[value]);
        });
    }
    /**
     * Values:
     * * channel
     * * message
     * * enabled
     * @param {String|Boolean} value Search value
     */
    welcomer(value) {
        return new Promise(async (resolve, reject) => {
            const [retval,] = await GuildWelcome.findOrCreate({ where: { guild_id: this.id } });
            if (typeof value === "boolean") {
                return resolve(retval);
            }
            return resolve(retval[value]);
        });

    }
    /**
     * Values:
     * * channel
     * * message
     * * enabled
     * @param {String|Boolean} value Search value
     */
    leaver(value) {
        return new Promise(async (resolve, reject) => {
            const [retval,] = await GuildLeave.findOrCreate({ where: { guild_id: this.id } });
            if (typeof value === "boolean") {
                return resolve(retval);
            }
            return resolve(retval[value]);
        });
    }
    /**
     * 
     * @param {JSON} options Options
     * 
     * Actions:
     * * fetch
     * * create
     * * edit
     * * remove
     * * reset
     * 
     * ```js
     * // Examples
     * const tagValue = await message.guild.db.tags({ action: 'fetch', name: 'test'});
     * const tags = await message.guild.db.tags;
     * await message.guild.db.tags({ action: 'create', name: 'test', value: 'jhahjajh hka'});
     * await message.guild.db.tags({ action: 'edit', name: 'test', newValue: 'LOLOLOL'});
     * await message.guild.db.tags({ action: 'remove', name: 'test'});
     * ```
     */
    async tags(options) {
        if (options) {
            switch (options.action) {
                case 'create': {
                    if (!options.value || !options.name) {
                        return 'Sorry, you need provide a name and description to create a tag';
                    }
                    try {
                        const tag = await GuildTags.create({
                            guild_id: this.id,
                            tag_name: options.name,
                            value: options.value,
                        });
                        return `Tag \`${tag.tag_name}\` has been created.`;
                    } catch (err) {
                        if (err.name === 'SequelizeUniqueConstraintError') {
                            return `Sorry, A tag with that name already exists.`;
                        }
                        return 'Sorry, something went wrong creating that tag.';
                    }
                }
                case 'edit': {
                    if (!options.newValue || !options.name) {
                        return 'Sorry, you need to provide the name and description to edit a tag';
                    }
                    const affectedRows = await GuildTags.update(
                        { value: options.newValue }, {
                        where: {
                            guild_id: this.id,
                            tag_name: options.name
                        }
                    }
                    );
                    if (affectedRows > 0) {
                        return `Tag \`${options.name}\` was edited.`;
                    }
                    return 'Sorry, That tag doesn\'t seem to exists';
                }
                case 'remove': {
                    if (!options.name) {
                        return 'Sorry, you need to provide the tag name to delete it.'
                    }
                    const rowCount = await GuildTags.destroy({ where: { guild_id: this.id, tag_name: options.name } });
                    if (!rowCount) {
                        return 'Sorry, That tag doesn\'t seem to exists';
                    }
                    return `Tag \`${options.name}\` has been deleted.`;
                }
                case 'reset': {
                    return await GuildTags.destroy({ where: { guild_id: this.id } });
                }
                case 'fetch': {
                    const tag = await GuildTags.findOne({ where: { guild_id: this.id, tag_name: options.name, } });
                    if (tag) {
                        return tag.get('value');
                    }
                    return '[TAG_DOESNT_EXISTS]';
                }
                default: {
                    break;
                }
            }
        }
        const taglist = await GuildTags.findAll({ where: { guild_id: this.id } });
        return `\`${taglist.map(t => t.tag).join('\`, \`') || 'No tags set.'}\``;
    }
};

module.exports = Guild;