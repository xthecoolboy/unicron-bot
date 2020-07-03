const Base = require('./Base');
const User = require('./User');

function removeElement(arr, key) {
    return arr.filter((item) => { return item !== key });
}

module.exports = class UserBadge extends Base {
    /**
     * 
     * @param {User} parent 
     */
    constructor(parent) {
        super(parent.id);
        this.data = parent.data;
    }
    /**
     * @returns {Promise<Boolean>}
     * @param {String} badge 
     */
    add(badge) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!this.data.data) this.data.data = {};
                const copy = this.data.data;
                if (copy['badges'] && copy['badges'].includes(badge)) return resolve(false);
                (copy['badges'] || (copy['badges'] = [])).push(badge);
                this.data.data['badges'] = copy;
                await this.data.save();
                return resolve(true);
            } catch (e) {
                reject(e);
            }
        });
    }
    /**
     * @returns {Promise<Boolean>}
     * @param {String} badge 
     */
    remove(badge) {
        return new Promise(async (resolve, reject) => {
            if (!this.data.data) this.data.data = {};
            if (this.data.data['badges'] && !this.data.data['badges'].includes(badge)) return resolve(false);
            const mcpy = removeElement(this.data.data['badges'], badge);
            this.data.data['badges'] = mcpy;
            await this.data.save();
            return resolve(true);
        });
    }
    /**
     * @returns {Boolean}
     * @param {String} badge 
     */
    has(value) {
        if (!this.data.data) this.data.data = {};
        if (!this.data.data['badges']) this.data.data['badges'] = [];
        return this.data.data['badges'].includes(value);
    }
    /**
     * @returns {Array<String>}
     */
    fetch() {
        if (!this.data.data) this.data.data = {};
        return this.data.data['badges'] ? this.data.data['badges'] : [];
    }
}