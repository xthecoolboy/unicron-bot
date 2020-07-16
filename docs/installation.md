# Installation

## Before you begin

1. Make sure you have installed [Node.js](https://www.guru99.com/download-install-node-js.html) v12 or higher and [Git](https://www.linode.com/docs/development/version-control/how-to-install-git-on-linux-mac-and-windows/)
2. Clone this repository with `git clone https://github.com/oadpoaw/unicron-bot.git`.
3. Run `cd unicron-bot` to move in the folder that Git has just created.

## Setting configurations.

### Create an `.env` file and copy the following: \(then place your credentials on it\)

```bash
# Default prefix for the bot
DEFAULT_PREFIX=
# Bot Token
BOT_TOKEN=
# Bot Owner ID (Multiple IDs aint gonna work)
BOT_OWNER_ID=
# Bot's Main/Support Server ID
BOT_SERVER_ID=
# Log Channel ID
BOT_CHANNEL_ID=
# Discord Server Invite Link
BOT_SERVER_URL=
# Some Basic Stuffs
# db_username
# db_password
# db_file - filename of the database (<Name>.sqlite)
UNICRON_DATABASE_USERNAME=
UNICRON_DATABASE_PASSWORD=
UNICRON_DATABASE_FILE=
USER_DATABASE_USERNAME=
USER_DATABASE_PASSWORD=
USER_DATABASE_FILE=
GUILD_DATABASE_USERNAME=
GUILD_DATABASE_PASSWORD=
GUILD_DATABASE_FILE=
# Server PORT
PORT=

# Note: some required environment variables were not listed because you will never get them such as API Keys
```

### Emojis

For emojis, you must add them on one of your bot's servers. Complete configuration for emojis are located on [Emojis](https://github.com/oadpoaw/unicron-bot/tree/6c975122a6b50ba1a0987885b47bc7f5a8d8d41e/assets/Emotes.json)

## Installing Dependencies

Open Command prompt or Powershell as **Administrator** then enter the following

```bash
$ npm install -g --production windows-build-tools
$ npm install --production
```

## Setting up the datbase

```bash
$ npm run dbInit
```

## Launching the bot

```bash
$ node .
```

enjoy!

