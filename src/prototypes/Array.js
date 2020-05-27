Array.intersection = function (arr1, arr2) {
    return arr1.unique().filter(e => arr2.includes(e));
};

Array.union = function (arr1, arr2) {
    return [...new Set([...arr1, ...arr2])];
};

Array.zip = function (...arr) {
    return [...arr[0]].map((_, i) => arr.map(a => a[i]));
};

Array.prototype.has = function (index) {
    if (index >= this.length) return false;
    if (index < 0 && this.length + index < 0) return false;
    return true;
};

Array.prototype.get = function (index) {
    return this[index < 0 ? this.length + index : index];
};

Array.prototype.set = function (index, value) {
    if (this.has(index)) {
        this[index < 0 ? this.length + index : index] = value;
        return true;
    }
    return false;
};

Array.prototype.head = function () {
    return this.get(0);
};

Array.prototype.tail = function () {
    return this.get(-1);
};

Array.prototype.flatten = function () {
    return this.reduce((acc, val) => acc.concat(val), []);
};

Array.prototype.flattenDeep = function () {
    return this.reduce((acc, val) => Array.isArray(val) ? acc.concat(val.flattenDeep()) : acc.concat(val), []);
};

Array.prototype.unique = function () {
    return [...new Set(this)];
};

Array.prototype.random = function () {
    return this[Math.floor(Math.random() * this.length)];
};

Array.prototype.shuffle = function () {
    let i = this.length;
    while (i) {
        let j = Math.floor(Math.random() * i);
        let t = this[--i];
        this[i] = this[j];
        this[j] = t;
    }
    return this;
};