
const Random = {
    version: 'v0.1.2',
    author: 'oadpoaw',
    /**
     * @param {number} length
     * @throws {RangeError} When Length is less than or equal to zero.
     * @return {string}
    */
    string: function (length = 5) {
        if (length <= 0) throw new RangeError('Lenght cannot go below 0');
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let str = '';
        for (var i = 0; i < length; i++) str += chars[Math.floor(Math.random() * chars.length)];
        return str;
    },
    /**
     * @param {Object} options
     * @param {number} options.max
     * @param {number} options.min
     * @default {max=100,min=0} 
     * @throws {RangeError} When options.max is less than or equal to options.min.
     * @return {number}
    */
    nextInt: function (options = { max: 100, min: 0 }) {
        if (options.max <= options.min) throw new RangeError('Max cannot be lower than or equal to Min');
        return Math.floor(Math.random() * (options.max - options.min + 1) + options.min);
    },
}
module.exports = Random;