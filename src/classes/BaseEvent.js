
module.exports = class {
    /**
     * 
     * @param {string} eventName 
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
