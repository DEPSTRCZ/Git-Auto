import yaml from "js-yaml";
import fs from "fs";
import crypto from "node:crypto";
import express from "express";
import { exec } from "child_process";
import { checkconfig } from "./check.js";
import { successfull, failed, unauthorized } from "./components.js";
const app = express();
const config = yaml.load(fs.readFileSync('../config.yml', 'utf8'));
//Check Conf
await checkconfig()
// Loading
console.log("\x1b[32m╔════════════════════════╗\x1b[0m\n\x1b[32m   Git Auto -\x1b[33m","Running..\n\x1b[32m╚════════════════════════╝\x1b[0m\n\x1b[46m Mode: \x1b[0m \x1b[36mGithub");
//Listen
app.listen(750, function(err){
    console.log(`\x1b[44m APP: \x1b[0m Started listening on: \x1b[4mhttp://<publicip>:${config.configuration.port}/deploy\x1b[0m`);
})
//Use
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use((req, res, next) => {
    if (req.url === '/deploy' && req.method === 'POST') return next();
    return res.status(404).end();
});
//Handling of the request
app.post('/deploy', async (req, res) => {
    //Checking if the request has the correct headers
    if (!req.header("X-GitHub-Event") || !req.header("X-GitHub-Delivery") || !req.header("X-Hub-Signature-256")) {
        res.status(401).end();
        //If not warning message here:
        console.log("\x1b[41m WARNING!: \x1b[0m An unauthorized request was catched!")
        if (config.discord_interaction.enabled) fetch(String(config.discord_interaction.webhookurl), {"method":"POST","headers": {"Content-Type": "application/json"},"body": JSON.stringify(unauthorized)}).catch(err => console.error(err));
        console.log(req)
        return
    }
    // generating the hash
    const hash = "sha256=" + crypto.createHmac('sha256', config.configuration.token)
    .update(JSON.stringify(req.body))
    .digest('hex');
    //if its correct then:
    if (req.header("X-Hub-Signature-256") == hash) {
        exec(config.configuration.command_pull, (error, stdout, stderr) => {
            // error
            if (error) {
                res.status(500).end();
                console.log("\x1b[45m ERROR: \x1b[0m",error.message);
                if (config.discord_interaction.enabled) fetch(String(config.discord_interaction.webhookurl), {"method":"POST","headers": {"Content-Type": "application/json"},"body": JSON.stringify(failed)}).catch(err => console.error(err));
                return;
            }
            //stderr / success dont ask me why..
            if (stderr) {
                res.status(202).end();
                console.log("\x1b[45m INFO: \x1b[0m",stderr);
                if (config.discord_interaction.enabled) fetch(String(config.discord_interaction.webhookurl), {"method":"POST","headers": {"Content-Type": "application/json"},"body": JSON.stringify(successfull)}).catch(err => console.error(err));
                return;
            }
        });
    }
})