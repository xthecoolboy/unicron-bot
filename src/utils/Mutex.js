
const mutex = {
    cache: new Map(),
    version: 'v0.0.2',
    author: 'oadpoaw',
    /**
     * @param {String} key
     * @param {Function} callback
     */
    alternate: function (key, callback) {
        if (!mutex.cache.has(key)) {
            mutex.cache.set(key, 'alternate');
            callback();
        } else {
            mutex.cache.delete(key);
        }
    },
    /**
     * @param {String} key
     * @param {Function} first_callback
     * @param {Function} second_callback
     */
    split: function (key, first_callback, second_callback) {
        if (!mutex.cache.has(key)) {
            mutex.cache.set(key, 'split');
            first_callback();
        } else {
            mutex.cache.delete(key);
            second_callback();
        }
    },
    /**
     * @param {String} key
     * @param {Function} callback
     */
    once: function (key, callback) {
        if (!mutex.cache.has(key)) {
            mutex.cache.set(key, 'once');
            callback();
        }
    }
};

module.exports = mutex;
