
## Dynamic Voice

---
#### dvconfig
Dynamic Voice Configuration.

Required Permissions:
- User Permission : `Server Administrator`
- Bot Permissions : `MANAGE_CHANNELS`, `MOVE_MEMBERS`

Keys:
- `category` - Channel Category where Dynamic Voice Channels are gonna be created.
- `waitingRoom` - The Voice Channel where users can join to create a Dynamic Voice Channel for themselves.

Usage:
```bash
$ dvconfig [view|set|enable|disable] [key] [value]
```

Example:
```bash
$ dvconfig set category 710028080013639712
$ dvconfig set waitingRoom 710028080013639713
```

---
#### dvsetup
Dynamic Voice Interactive Setup.

Required Permissions:
- User Permission : `Server Administrator`
- Bot Permissions : `MANAGE_CHANNELS`, `MOVE_MEMBERS`

![Example](../../assets/dvsetup.png)

---