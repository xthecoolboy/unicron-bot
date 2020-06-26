const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

rl.on('line', async (str) => {
    try {
        const output = await eval(str);
        console.log(output);
    } catch (e) {
        console.log(e);
    }
});