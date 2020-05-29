
const Random = {
    version: 'v0.0.2',
    author: 'oadpoaw',
    /**
     * @param {Number} length
     * @throws {RangeError} When Length is less than or equal to zero.
     * @return {String}
    */
    string: function (length = 5) {
        if (length <= 0) {
            throw new RangeError('Length musn\'t go below 0');
        }
        const chars = 'abcdefABCDEF0123456789';
        let str = '';
        for (var i = 0; i < length; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
    },
    /**
     * @param {Object} options
     * @throws {RangeError} When options.max is less than or equal to options.min.
     * @return {Number}
    */
    nextInt: function (options = { max: 100, min: 0 }) {
        if (options.max <= options.min) {
            throw new RangeError('Max cannot be lower than or equal to Min');
        }
        return Math.floor(Math.random() * (options.max - options.min + 1)) + options.min;
    },

    /**
     * @param {Array} array
     * @param {Object} options
     * @throws {RangeError} When options.max is greater than the array.length OR options.max is less than or equal to options.min
     * @return {Any}
    */
    nextIndex: function (array, options = { max: array.length, min: 0 }) {
        if (options.max > array.length) {
            throw new RangeError('Max must not exceed the array length');
        }
        if (options.max <= options.min) {
            throw new RangeError('Max cannot be lower than or equal to Min');
        }
        return array[Math.floor(Math.random() * (options.max - options.min + 1)) + options.min];
    }
}
module.exports = Random;