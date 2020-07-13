const Endpoint = require('../classes/Endpoint');
const Authorization = require('../auth/Dashboard');

class Dashboard extends Endpoint {
    constructor(app) {
        super('/api/v1/dashboard', app);
    }
    createRoute() {

        this.route.use(Authorization);

        this.route.get('/', (req, res) => {
            res.status(200).json({
                endpoints: [
                    'GET /discord/user/:id',
                    'GET /discord/guild/:id',
                    'GET /unicron/user/:id',
                    'GET /unicron/guild/:id',
                    'POST /unicron/user/:id',
                    'POST /unicron/guild/:id',
                ]
            });
        });

        this.route.get('/discord/user/:id', async (req, res) => {
            if (!req.params.id) return res.status(400).json({ message: `Bad Request: Parameter /../user/:id not provided` });
            const user = await this.client.fetchUser(req.params.id);
            if (!user) return res.status(404).json({ message: `Not Found: '${req.params.id}' not found` });
            res.status(200).json(user.toJSON());
        });

        this.route.get('/discord/guild/:id', async (req, res) => {
            if (!req.params.id) return res.status(400).json({ message: `Bad Request: Parameter /../guild/:id not provided` });
            const guild = await this.client.fetchGuild(req.params.id);
            if (!guild) return res.status(404).json({ message: `Not Found: '${req.params.id}' not found` });
            res.status(200).json(guild.toJSON());
        });

        this.route.get('/unicron/user/:id', async (req, res) => {
            if (!req.params.id) return res.status(400).json({ message: `Bad Request: Parameter /../user/:id not provided` });
            if (!/^(\d{17,19})$/.test(req.params.id)) return res.status(400).json({ message: `Bad Request: ${req.params.id} is not a snowflake` });
            const user = await this.client.database.users.fetch(req.params.id);
            res.status(200).json(await user.toJSON());
        });

        this.route.get('/unicron/guild/:id', async (req, res) => {
            if (!req.params.id) return res.status(400).json({ message: `Bad Request: Parameter /../guild/:id not provided` });
            if (!/^(\d{17,19})$/.test(req.params.id)) return res.status(400).json({ message: `Bad Request: ${req.params.id} is not a snowflake` });
            const guild = await this.client.database.guilds.fetch(req.params.id);
            res.status(200).json(await guild.toJSON());
        });

        return this.route;
    }
}

module.exports = Dashboard;