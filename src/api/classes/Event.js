const API = require('../API');
class Event {
    /**
     * 
     * @param {String} name 
     * @param {API} app 
     */
    constructor(name, app) {
        this.eventName = name;
        this.server = app;
    }
}
module.exports = Event;