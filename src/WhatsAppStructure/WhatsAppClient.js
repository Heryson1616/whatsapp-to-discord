const wa = require('@open-wa/wa-automate')

module.exports = class WppClient {
    constructor() {}
    async inicialize() {
        global.wclient = await wa.create({
            sessionId: "client",
            multiDevice: true,
            authTimeout: 60,
            blockCrashLogs: true,
            disableSpins: true,
            headless: true,
            hostNotificationLang: 'PT_BR',
            logConsole: false,
            popup: true,
            qrTimeout: 0,
        })
        global.WCLIENT_READY = true
        wclient.onMessage(async (message) => {
            try {
            delete require.cache[require.resolve("./events/on-MessageCreate")]
            let { execute } = require('./events/on-MessageCreate')
            execute(message)
        } catch(e) {
            global.log(`Erro detectado no Client WhatsApp:\n${e}`, "WPP CLIENT", "error")
        }
        });
    }
}