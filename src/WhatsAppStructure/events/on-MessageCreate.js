module.exports = class WppMessageCreate {
    static async execute(message) {
        if(message.chat.id != process.env.GROUP_ID || message.type != "chat" || !message.isGroupMsg) return;
        global.dclient.executeWebhook(process.env.DISCORD_WEBHOOK.split('|')[0], process.env.DISCORD_WEBHOOK.split('|')[1], {
            content: message.text || "mensagem não encontrada",
            avatarURL: message.sender.profilePicThumbObj.imgFull || null,
            username: message.sender.pushname || message.sender.name || "Nome não encontrado",
          })
    }
}