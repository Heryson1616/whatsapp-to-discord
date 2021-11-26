const util = require('util')
module.exports = class MessageCreateDiscord {
    static async execute(message) {
        if(message.author.bot || message.channel.id !== process.env.DISCORD_CHANNEL_ID || !global.WCLIENT_READY) return;
        let msgContent = `*${message.author.username || message.member.displayName}*:\n${message.content}`

        /*if(message?.mentions.members?.first()) {
            message.mentions.members.forEach(m => {
                msgContent.replace(m.user.toString(), m.displayName)
            })
        }*/

        switch(message.content.toLowerCase()) {
            case ".ping":
                let pingDiscord = Date.now()
                let msgPing = await dclient.createMessage(message.channel.id, `<a:carregando:765952420575444994> **| Calculando ping...**`)
                let totalDiscord = Date.now() - pingDiscord

                msgPing.edit(`> **Tempo de resposta**\nDiscord: **${totalDiscord}ms**\nWhatsApp: <a:carregando:765952420575444994> **| calculando...**`)

                let pingWpp = Date.now()
                let msgWpp = await wclient.sendText(process.env.GROUP_ID, "calculando o ping...")
                let totalWpp = Date.now() - pingWpp

                return msgPing.edit(`> **Tempo de resposta**\nDiscord: **${totalDiscord}ms**\nWhatsApp: **${totalWpp}ms**`)
            case '.teste':
                return;
        }
        if(message.content.toLowerCase().startsWith(".eval")) {
            let evaled = await eval(`${message.content.replace('.eval', '')}`)
            return dclient.createMessage(message.channel.id, `\`\`\`js\n${String(util.inspect(evaled)).slice(0, 1800)}\`\`\``)
        }
        return await wclient.sendText(process.env.GROUP_ID, msgContent)
    }
}