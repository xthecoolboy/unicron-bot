
const Endpoint = require('../classes/Endpoint');
const Authorization = require('../auth/User');
const { UserProfile } = require('../../database/database');
const UserStats = require('../../classes/User');
const { Regex } = require('../../utils');

class User extends Endpoint {
    constructor(app) {
        super('/user', app);
    }
    createRoute() {
        this.route.use(Authorization);
        this.route.get('/:id', async (req, res) => {
            const user_id = req.params.id;
            if (!user_id) return res.status(400).send({ message: 'Missing Parameters for /user/:id'});
            if (!Regex.discord.snowflake.test(user_id)) return res.status(400).send({ message: `'${user_id}' is not a snowflake`});
            const data = await UserProfile.findOne({ where: { user_id }});
            if (!data) return res.status(404).send({ message: `'${user_id}' does not exist in the database`});
            const instance = new UserStats(user_id, data);
            res.status(200).send(await instance.toJSON());
        });
        return this.route;
    }
}

module.exports = User;