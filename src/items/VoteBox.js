
const Client = require('../classes/Unicron');
const { Message } = require('discord.js');
const BaseItem = require('../classes/BaseItem');

module.exports = class VoteBox extends BaseItem {
    constructor() {
        super({
            config: {
                id: 'votebox',
                displayname: '🗃️ Vote Box',
                description: 'Get this item by voting!',
            },
            options: {
                buyable: false,
                sellable: true,
                usable: true,
                price: 4000,
                cost: 1000,
            }
        });
        this.prizes = [
            {
                id: 'bread',
                amount: 12,
            }, {
                id: 'apple',
                amount: 14,
            }, {
                id: 'pancake',
                amount: 8,
            }, {
                id: 'cookie',
                amount: 10,
            }, {
                id: 'bow',
                amount: 1,
            }, {
                id: 'dagger',
                amount: 1,
            }, {
                id: 'badges',
                amount: 1,
            }, {
                id: 'padlock',
                amount: 1,
            },
        ];
    }
    /**
     * @returns {Promise<boolean|Message>}
     * @param {Client} client 
     * @param {Message} message 
     */
    async run(client, message) {
        const coins = client.utils.Random.nextInt({ max: 3000, min: 1000 });
        const msg = await message.channel.send('Rolling the Vote Box...');
        const theItem = this.prizes[Math.floor(Math.random() * this.prizes.length)];
        let content = ``;
        await client.wait(1500);
        this.prizes = client.shuffle(this.prizes);
        for (let i = 0; i < this.prizes.length; i++) {
            content = '';
            const prev = this.prizes[i - 1] ? this.prizes[i - 1] : this.prizes.lastItem;
            const item = this.prizes[i];
            const next = this.prizes[i + 1] ? this.prizes[i + 1] : this.prizes[0];
            if (prev) content += `.\n\t${client.shopitems.get(prev.id).config.displayname}\n`;
            content += `-> [${client.shopitems.get(item.id).config.displayname}] <-\n\t`;
            if (next) content += `${client.shopitems.get(next.id).config.displayname} -\n\t`;
            await msg.edit(content);
            await client.wait(1000);
        }
        await msg.edit(content.replace(/\[.*?\]/g, `[${client.shopitems.get(theItem.id).config.displayname}]`));
        await client.wait(3000);
        await msg.edit(`:tada: You have received :tada:\n- **${coins}** Coins 💰\n- **${theItem.amount}** ${client.shopitems.get(theItem.id).config.displayname}`)
        for (let i = 0; i < theItem.amount; i++) {
            await message.author.db.inventory.add(theItem.id);
        }
        await message.author.db.coins.add(coins);
        await message.author.db.levelup(client, message, 130);
        await message.author.db.inventory.remove(this.config.id);
    }
}