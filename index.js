console.clear()
const express = require('express');
const app = express();
const c = require('chalk')
const moment = require('moment-timezone')
require('dotenv').config()


/* Logger Global */
global.log = (message, setor = "CLIENT", type = 'log') => {
    moment.locale("pt-BR")
    let msg = `[ ${setor} | ${moment.tz(Date.now(), "America/Bahia").format("LT")} ] - ${message}`

    switch(type) {
        case 'log': return console.log(c.greenBright(msg))
        case 'error': return console.error(c.redBright(msg))
        case 'crash': return console.log(c.blueBright(msg))
    }
}

log(`Iniciando aplicação...`, "BOOT", "log")

/* Iniciando servidor express */
app.get("/", (request, response) => {
    const ping = new Date();
    ping.setHours(ping.getHours() - 3);
    log(`Ping recebido`, "EXPRESS", "log")
    response.sendStatus(200);
});
app.listen(process.env.PORT);

/* Iniciando Aplicações */
const WhatsAppClient = new (require("./src/WhatsAppStructure/WhatsAppClient"))(this)
const DiscordClient = (new (require("./src/DiscordStructure/DiscordClient"))(this))

try {
    WhatsAppClient.inicialize()
    DiscordClient.inicialize()
} catch(e) {
    log(`Erro na inicialização dos aplicativos`, "BOOT", 'error')
}

/**
 * Sistemas ""anti-crash"" (as vezes falhos, mas normalmente ajudam) 
 * se tiver problemas para encerrar o processo
 * Aperte Ctrl + Z ao invés de Ctrl + C
 * no terminal
 */
process.on('unhandledRejection', (reason, p) => global.log(`SCRIPT REJEITADO: ${reason}`, "ANTI-CRASH", 'crash'));

process.on("uncaughtException", (err, o) => global.log(`CATCH ERROR: ${err}`, "ANTI-CRASH", 'crash'))

process.on('uncaughtExceptionMonitor', (err, o) => global.log(`BLOQUEADO: ${err}`, "ANTI-CRASH", 'crash'));

//process.on('multipleResolves', (type, promise, reason) => global.log(`MULTIPLOS ERROS:\n${util.inspect(promise)}`, "ANTI-CRASH", 'crash'));