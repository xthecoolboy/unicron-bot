const Endpoint = require('../classes/Endpoint');
const Authorization = require('../validators/Authorization');
const Voter = require('../../classes/Voter');

class Webhook extends Endpoint {
    constructor(app) {
        super('/webhook', app);
        this.parseJSON = {
            discordboats: function (body) {
                return {
                    id: body.user.id,
                    site: 'Discord.boats'
                };
            },
            glennbotlist: function (body) {
                return {
                    id: body.id,
                    site: 'Glenn Bot List'
                }
            },
            arcanecenter: function (body) {
                return {
                    id: body.user.id,
                    site: 'Arcane Center xyz'
                }
            }
        }
    }
    createRoute() {
        this.route.use(Authorization);
        this.route.post('/donate', (req, res) => {
            try {
                const buyer = req.body;
                res.status(202).send(buyer);
            } catch (e) {
                res.status(500).send({
                    message: 'Internal Server Error'
                });
                this.client.logger.error(e);
            }
        });
        this.route.post('/vote/:botlist', (req, res) => {
            try {
                const list = req.params.botlist;
                if (!list || !this.parseJSON.hasOwnProperty(list)) {
                    res.sendStatus(400);
                    return;
                }
                const parsed = this.parseJSON[list](req.body);
                if (!parsed.id) return res.status(400).send({ message: 'Bad Request' });
                this.client.emit('vote', new Voter(parsed));
                res.status(202).send(parsed);
            } catch (e) {
                console.log(e);
                res.status(500).send({
                    message: 'Internal Server Error'
                });
            }
        });
        return this.route;
    }
}

module.exports = Webhook;