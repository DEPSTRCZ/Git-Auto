import yaml from "js-yaml";
import fs from "fs";
const config = yaml.load(fs.readFileSync('../config.yml', 'utf8'));
export async function checkconfig() {
    console.log("\x1b[43m","INFO:","\x1b[0m","Checking config.yml Please wait...");

    if(typeof config.debug_mode !== "boolean") {
        console.log("\x1b[41m","CONFIG ERR:","\x1b[0m","In \"debug_mode\" Line: 4"); 
        throw new Error("Value must be type of boolean!");
    }
    if(! (config.configuration.service === "gitlab" || config.configuration.service === "github")) {
        console.log("\x1b[41m","CONFIG ERR:","\x1b[0m","In \"configuration/service\" Line: 13");
        throw new Error("Value must be \"gitlab\" or \"github\"!");
    }
    if(typeof config.configuration.token !== "string") {
        console.log("\x1b[41m","CONFIG ERR:","\x1b[0m","In \"configuration/token\" Line: 18");
         throw new Error("Value must be string!");
    }
    if(typeof config.configuration.port !== "number") {
        console.log("\x1b[41m","CONFIG ERR:","\x1b[0m","In \"configuration/port\" Line: 23");
        throw new Error("Value must be number!");
    }
    if(typeof config.configuration.command_pull !== "string") {
        console.log("\x1b[41m","CONFIG ERR:","\x1b[0m","In \"configuration/command_pull\" Line: 28");
        throw new Error("Value must be string!");
    }

    console.log("\x1b[43m","INFO:","\x1b[0m","Config.yml marked as valid.. Continuing");

    if(config.debug_mode) console.log("\x1b[43m","INFO:","\x1b[0m","Debug mode is enabled!");
    if(config.discord_interaction.enabled) console.log("\x1b[43m","INFO:","\x1b[0m","Discord interaction is enabled!");
    if(config.discord_interaction.logs) console.log("\x1b[43m","INFO:","\x1b[0m","Discord interaction logs are enabled!");
}