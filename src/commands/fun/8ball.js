
const answers = [
    'yes',
    'no',
    'maybe',
    'sort of',
    'can\'t tell',
    'ofc not',
    'probably',
    'yes but no',
    'no but yes',
    'yep',
    'nope',
    'i don\'t think so',
    'well yes but actually no',
    'well no but actually yes',
]


module.exports = {
    run: async function (client, message, args) {
        return message.channel.send(answers.random());
    },
    config: {
        name: '8ball',
        description: '8Ball command which replies to a yes or no question',
        permission: 'User',
    },
    options: {
        aliases: ['8-ball'],
        cooldown: 10,
        args: true,
        usage: '8ball [question]',
    }
}