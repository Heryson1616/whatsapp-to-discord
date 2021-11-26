const Eris = require("eris");
const c = require('chalk')
module.exports = class WppClient {
    constructor() {}
    async inicialize() {
        global.dclient = new Eris(`Bot ${process.env.DISCORD_BOT_TOKEN}`, {
            intents: [ "guilds", "guildMessages" ],
            maxShards: 1
        });
        
        dclient.on("ready", () => global.log(`Sessão do Client Discord iniciada como ${dclient.user.username}#${dclient.user.discriminator}`, "DSC CLIENT", "log") );
        
        dclient.on("error", (err) => {
            global.log(`Erro detectado no Client Discord:\n${e}`, "DSC CLIENT", "error")
        });
        
        dclient.on("messageCreate", (message) => {
            try {
                delete require.cache[require.resolve("./events/on-MessageCreate")]
                let { execute } = require('./events/on-MessageCreate')
                execute(message)    
            } catch(e) {
                global.log(`Erro detectado no Client Discord:\n${e}`, "DSC CLIENT", "error")
            }
        });
        
        dclient.connect();
    }
}