import yaml from "js-yaml";
import fs from "fs";
import express from "express";
import * as CryptoJS from 'crypto-js';
import { exec } from "child_process";
import { checkconfig } from "./check.js";
const app = express();
const config = yaml.load(fs.readFileSync('../config.yml', 'utf8'));
let service = "";
// Loading
await checkconfig()
// checker


if(config.debug_mode) console.log("\x1b[43m","INFO:","\x1b[0m","Debug mode is enabled!");
if(config.additional_configuration.push.enabled) console.log("\x1b[43m","INFO:","\x1b[0m","Push function is enabled!");
if(config.discord_interaction.enabled) console.log("\x1b[43m","INFO:","\x1b[0m","Discord interaction is enabled!");
if(config.discord_interaction.logs) console.log("\x1b[43m","INFO:","\x1b[0m","Discord interaction logs are enabled!");
console.log("\x1b[32m","╔════════════════════════╗","\x1b[0m","\n\x1b[32m","  Git Auto -","\x1b[33m","Started..","\n\x1b[32m","╚════════════════════════╝","\x1b[0m");
// Embeds
//const started = embed discord
// App listen
app.listen(750, function(err){
    console.log("\x1b[44m","APP:","\x1b[0m","Started listening on:","\x1b[4m",`http://<publicip>:${config.configuration.port}/deploy`,"\x1b[0m");
})
app.use((req, res, next) => {
    if (req.url === '/deploy' && req.method === 'POST') return next();
    return res.status(404).end();
});
app.post('/deploy', (req, res) => {
    if (!service == req.header(service)) {
        res.status(401).end();
        console.log("\x1b[43m","WARNING!:","\x1b[0m","An unauthorized request was catched!")
        console.log(req)
        return
    }
    exec(config.configuration.command_pull, (error, stdout, stderr) => {
        if (error) {
            console.log("\x1b[45m","ERROR:","\x1b[0m",error.message);
            //const errormsg ={"content": null,"embeds": [{"title": "The app has returned an Error!","color": 16719904,"description": `\`\`${error.message}\`\``,"author": {"name": "Dp Auto Deploy"},"footer": {"text": "© DEPSTRCZ#9987">
            //if (process.env.WEBHOOKURL) fetch(String(url), {"method":"POST","headers": {"Content-Type": "application/json"},"body": JSON.stringify(errormsg)}).catch(err => console.error(err));
            return;
        }
        if (stderr) {
            console.log("\x1b[45m","INFO:","\x1b[0m",stderr);
            //const failed = {"content": null,"embeds": [{"title": "The app has failed executing!","description":`\`\`${stderr}\`\``,"color": 16750848,"author": {"name": "Dp Auto Deploy"},"footer": {"text": "© DEPSTRCZ#9987"},"timesta>
            //if (process.env.WEBHOOKURL) fetch(String(url), {"method":"POST","headers": {"Content-Type": "application/json"},"body": JSON.stringify(failed)}).catch(err => console.error(err));
            return;
        }
        console.log("\x1b[45m","EXECUTED:","\x1b[0m",stdout);
        //const executing = {"content": null,"embeds": [{"title": "A Git Pull has been executed","color": 2683660,"description": "The app has caught a verified request and successfully executed git pull!","author": {"name": "Dp Auto D>
        //if (process.env.WEBHOOKURL) fetch(String(url), {"method":"POST","headers": {"Content-Type": "application/json"},"body": JSON.stringify(executing)}).catch(err => console.error(err));
    });
})
