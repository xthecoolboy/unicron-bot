# Commands  
Here's the list of all commands.

#### Contents of the table  
**Name**: The name of the command  
**Description**: A brief explanation of the purpose of the command  
**Usage**: The arguments/options that the command takes in parameters
- `<>` are required
- `[]` are optional
- `()` are Miscellaneous informations
- `...` symbol it means it can have one or more arguments

::: tip
You can do `help <Command>` for more information about a specific command
:::


### Moderation
**Moderation** commands to strict your server from rule breakers!

| Name           | Description                               | Usage                                |
| :------------- | :---------------------------------------- | :----------------------------------- |
| **ban**        | Bans a member from the server             | `ban <User> [Duration] [...Reason]`  |
| **kick**       | Kicks a member from the server            | `kick <User> [...Reason]`            |
| **softban**    | Bans a member then immediately unban      | `softban <User> [...Reason]`         |
| **pardon**     | Pardon/unbans someone from the server     | `pardon <UserID> [...Reason]`        |
| **mute**       | Mutes someone from the server             | `mute <User> [Duration] [...Reason]` |
| **unmute**     | Unmutes someone from the server           | `unmute <User> [...Reason]`          |
| **warn**       | Warns someone from the server             | `warn <User> [Duration] [...Reason]` |
| **warnings**   | View warnings of the specified user       | `warnings [User]`                    |
| **clearwarns** | Clears the warnings of the specified user | `clearwarns <User>`                  |


### Settings
Fully **Customizable** Configurations. including simplistic interactive configuration setups,
to configure Unicron Bot functionality for your server.

All commands below requires permission level `Server Administrator`

| Name             | Description                                                  | Usage                                                      |
| :--------------- | :----------------------------------------------------------- | :--------------------------------------------------------- |
| **automod**      | Toggles Auto-Moderation on your server                       | `automod`                                                  |
| **config**       | Configure Unicron's settings for the current server          | `config <Action> <Key> <Value>`                            |
| **noswear**      | Toggles No Swear on your server                              | `noswear`                                                  |
| **verification** | Enable/Disable/Configure Member Verification Feature         | `verification [--enable|--disable]` or just `verification` |
| **invitefilter** | Toggles Discord Invite Filter to block discord invite links! | `invitefilter`                                             |
| **welcomer**     | Setup Welcomer/Greeter on your server                        | Just do `help welcomer` (Too many usages :P)`              |
| **farewell**     | Setup Farewell to your server                                | Just do `help farewell` (Too many usages too :P)           |

### Dynamic Text/Voice
Which allows users to create their own text/voice Channels to enhance your community environment as your users continue to meet new people.

| Name         | Description                                       | Usage                                                                                 |
| :----------- | :------------------------------------------------ | :------------------------------------------------------------------------------------ |
| **dconfig**  | Configure Dynamic Text/Voice to your server!      | `dconfig <view|set|enable|disable> <key> [value]` or use `help dconfig` for more info |
| **dtcreate** | Creates a Dynamic Text Channel!                   | `dtcreate`                                                                            |
| **dtinvite** | Invite some people to your Dynamic Text Channel!  | `dtinvite <...Users>`                                                                 |
| **dvsetup**  | Setup Dynamic Voice interactively to your server! | `dvsetup`                                                                             |

### Ticket System
Our wonderful very simple **Ticket System** bringing/helping support from your members as your community continue to grows

You can also have a role named `Support Team` so whoevers has that role can access any ticket.

| Name             | Description                                | Usage                                                  |
| :--------------- | :----------------------------------------- | :----------------------------------------------------- |
| **new**          | Creates a new support ticket               | `new <...Topic>`                                       |
| **close**        | Closes a support ticket                    | `close [...Reason]`                                    |
| **ticketconfig** | Configure the ticket system to your server | Just do `help ticketconfig` (Also Too many usages ._.) |

### Search
Searching commands, what more could you want?

| Name              | Description                                                         | Usage                            |
| :---------------- | :------------------------------------------------------------------ | :------------------------------- |
| **github**        | Searches the given repository name                                  | `github <Username>/<Repository>` |
| **mdn**           | Searches the given query on MDN (Javascript Docs)                   | `mdn <Query>`                    |
| **npm**           | Searches the specified package on NPM (Node Package Manager)        | `npm <Query>`                    |
| **screenshot**    | Takes a screenshot of the specified website!                        | `screenshot <Site URL>`          |
| **stackoverflow** | The google of programmers                                           | `stackoverflow <Query>`          |
| **steam**         | Searches a game on steam and showing it's cool information about it | `steam <Game>`                   |

### Economy
idk what to put here ngl, just so you know **Unicron's Economy** is good for keeping your server active and it's cool xd

| Name            | Description                                             | Usage                                                                         |
| :-------------- | :------------------------------------------------------ | :---------------------------------------------------------------------------- |
| **balance**     | Shows the balance of a user                             | `balance [User]`                                                              |
| **beg**         | Use this to beg some coins!                             | `beg`                                                                         |
| **buy**         | Buy some items from the shop!                           | `buy <ItemID>`                                                                |
| **shop**        | View all purchasable items from the amazing poop shop   | `shop [Page]`, `shop view <ItemID>`                                           |
| **sell**        | Sell some items from your inventory and get some coins! | `sell <ItemID>`                                                               |
| **use**         | Use an item from your inventory                         | `use <ItemID>`                                                                |
| **inventory**   | Shows your inventory full of goodies                    | `inv [User]`                                                                  |
| **crime**       | Go commit some crimes and get the coins!                | `crime`                                                                       |
| **work**        | Go make a living to earn that precious salary!          | `work <Job>`, Jobs: `mailman`, `developer`, `carpenter`, `mechanic`, `police` |
| **hourly**      | Receive some coins every hour!                          | `hourly`                                                                      |
| **payday**      | Receive some more coins every day!                      | `payday`                                                                      |
| **leaderboard** | Shows the richest members for the current server        | `leaderboard [Page]`                                                          |
| **steal**       | Steal some coins from another user!                     | `rob [User]`                                                                  |
| **share**       | Share someone some coins from you <3                    | `share <Amount> <User>`                                                       |
| **profile**     | Shows your current awesome economy stats!               | `profile [User]`                                                              |
| **marriage**    | Shows who you are married to                            | `marriage [User]`                                                             |
| **marry**       | Marry someone on discord xd                             | `marry <User>`                                                                |
| **divorce**     | File a divorce to whom you are married to ;p            | `divorce`                                                                     |

### Utility
Some very useful utility commands ;)

| Name            | Description                                                                         | Usage                                                                        |
| :-------------- | :---------------------------------------------------------------------------------- | :--------------------------------------------------------------------------- |
| **calc**        | Calculates the given Math Expression                                                | `calc <Expression>`                                                          |
| **embed**       | Make awesome fancy embeds using this command!                                       | `embed <...Text`, `embed -json <Raw JSON>`                                   |
| **help**        | List all commands, you know how this works :P                                       | `help <Category|Command>`                                                    |
| **length**      | Shows the length of the given text                                                  | `length <...Text>`                                                           |
| **permissions** | Shows you your permission level for the current guild location                      | `permissions`                                                                |
| **ping**        | Shows the Bot's ping through out discord                                            | `ping`                                                                       |
| **prefix**      | Shows the Bot's prefix for the current server/guild                                 | `prefix`                                                                     |
| **redeem**      | Redeem a super super secret code                                                    | `redeem <Code>`                                                              |
| **shard**       | Shows what shard is the current server located on the Bot's system                  | `shard [ServerID]`                                                           |
| **support**     | Shows the bot's invite link, support server and donation link for the bot           | `support`                                                                    |
| **tag**         | Create/Edit/Delete predefined messages to speed up some processes in your community | `tag <create|edit> <tagName> <...value>`, `tag list`, `tag delete <tagName>` |

### Miscellaneous
???

| Name           | Description                                                            | Usage                |
| :------------- | :--------------------------------------------------------------------- | :------------------- |
| **avatar**     | Shows your or the specified user's avatar                              | `avatar [User]`      |
| **botinfo**    | Shows the bot's statistics and condition                               | `botinfo`            |
| **crypto**     | Get latest crypto exchange price in USD, or in other cryptos           | `crypto <...Symbol>` |
| **md5**        | Encrypts the given text into MD5 Hash                                  | `md5 <...Text>`      |
| **morse**      | Encodes the given text into morse encoding                             | `morse <...Text>`    |
| **poll**       | Make polls using this command!                                         | `poll <...Question>` |
| **reverse**    | Reverses the given text                                                | `reverse <...Text>`  |
| **rot13**      | Ciphers the given text into ROT13 Eg. A=R, B=S                         | `rot13 <...Text>`    |
| **serverinfo** | Shows the information of the current server                            | `serverinfo`         |
| **sha1**       | Encrypts the given text using the SHA1 Algorithm                       | `sha1 <...Text>`     |
| **sha256**     | Encrypts the given text using the SHA256 Algorithm                     | `sha256 <...Text>`   |
| **sha512**     | Encrypts the given text using the SHA512 Algorithm                     | `sha512 <...Text>`   |
| **terms**      | Shows Unicron's Terms of Service                                       | `terms`              |
| **urban**      | Searches the definition of the given word/text on the urban dictionary | `urban <Query>`      |
| **userinfo**   | Shows you or the specified user's information on discord               | `userinfo [User]`    |

### Fun
WOAHHHHH yeyyy fun commands woohoooooo oh yeahhh, hmmmm somehow that sounded sarcastic xd

| Name              | Description                                                            | Usage                 |
| :---------------- | :--------------------------------------------------------------------- | :-------------------- |
| **8ball**         | The 8ball command :P                                                   | `8ball <...Question>` |
| **advice**        | Get a random life advice!                                              | `advice`              |
| **badquotes**     | Gives you a random bad quote lol                                       | `badquotes`           |
| **cat**           | Shows a random iamges of a cat                                         | `cat`                 |
| **chucknorris**   | Sends a radom Chuck Norris quote                                       | `chucknorris`         |
| **cointoss**      | Flips a coin                                                           | `cointoss`            |
| **dadjoke**       | Sends a random dad joke lmao                                           | `dadjoke`             |
| **dog**           | Shows a random images of a dog xd                                      | `dog`                 |
| **duck**          | Shows a random images of a duck duck                                   | `duck`                |
| **emoji**         | Sends a random unicode emoji  :P                                       | `emoji`               |
| **fidgetspinner** | Spins a fidget spinner for you and shows for how long it was spinning. | `fidgetspinner`       |
| **foaas**         | Sends a Random F*ck Off As A Service! No wonder it's NSFW              | `foaas`               |
| **fortune**       | Sends you a random fortune for your life xd                            | `fortune`             |
| **fox**           | Shows a random images of a fox ;o                                      | `fox`                 |
| **gayrate**       | Shows you or the specified user rate of being GAY , LOL                | `gayrate`             |
| **insult**        | Sends a random insulting things xd                                     | `insult`              |
| **joke**          | SENDS A RANDOM JOKE OMG                                                | `joke`                |
| **kanyewest**     | Sends a random Kanye West Quote                                        | `kanyewest`           |
| **lenny**         | Responds with `( ͡° ͜ʖ ͡°)`                                               | `lenny`               |
| **meme**          | Sends a random meme from reddit dx                                     | `meme`                |
| **nitro**         | Sends a fake nitro gift LOL                                            | `nitro`               |
| **penis**         | Shows you or the specified user's penis length , oh lol                | `penis`               |
| **programming**   | Sends a random quote about programming                                 | `programming`         |
| **quote**         | Sends a random inspirational quote!                                    | `quote`               |
| **slap**          | Slap someone using this command to do so xd                            | `slap <User>`         |
| **spam**          | Shows an image of the SPAM Brand (Not sponsored xd)                    | `spam`                |
| **tableflip**     | Flips up a table (with a cool animation)                               | `tableflip`           |
| **trump**         | Sends a random stupid thing that Donald Trump said                     | `trump`               |

::: info
Note: Some of the informations above may or may not be accurate as the bot continues to grow and some of the informations may or may be missing in this context
:::
