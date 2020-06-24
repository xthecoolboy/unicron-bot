const Event = require('../classes/Event');

class VoteEvent extends Event {
    constructor(app) {
        super('vote', app);
    }
    /**
     * 
     * @param {JSON} voter 
     */
    run(voter) {

    }
}