
module.exports = class {
    /**
     * 
     * @param {String} eventName 
     */
    constructor(eventName) {
        this.eventName = eventName;
    }
}

/**
const BaseEvent = require('../classes/BaseEvent');

module.exports = class extends BaseEvent {
    constructor() {
        super('');
    }
    
    async run(client) {

    }
}
 */
