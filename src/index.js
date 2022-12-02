import yaml from "js-yaml";
import fs from "fs";
const config = yaml.load(fs.readFileSync('../config.yml', 'utf8'));
if(config.configuration.service === "gitlab") {
    await import("../src/gitlab.js")
} else {
    await import("../src/github.js")
}