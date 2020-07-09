module.exports = {
    discord: {
        invite: /\b(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|(discordapp|discord)\.com\/invite)\/\w+[a-z]/gi,
        userOrMember: /^(?:<@!?)?(\d{17,19})>?/,
        channel: /^(?:<#)?(\d{17,19})>?/,
        role: /^(?:<@&)?(\d{17,19})>?/,
        snowflake: /^(\d{17,19})$/,
        emoji: /^(?:<a?:\w{2,32}:)?(\d{17,19})>?/,
        username: /.{2,32}/,
        discriminator: /(#)\d{4}/,
        tag: /.{2,32}(#)\d{4}/,
        token: /[\w]{24}\.[\w]{6}\.[\w-_]{27}/,
    },
}