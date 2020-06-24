const Endpoint = require('../classes/Endpoint');

class Webhook extends Endpoint {
    constructor(app) {
        super('/api/v1/webhook', app);
    }

    createRoute(){
        this.route.post('/:botlist', (req, res) => {
            try {
                
            } catch (e) {
                res.status(500).send({
                    message: 'Internal Server Error'
                });
                this.server.logger.error(e);
            }
        });


        return this.route;
    }
}

module.exports = Webhook;