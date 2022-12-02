import { stderr } from "node:process"
import { request } from "express"
export const successfull = {
    "content": null,
    "embeds": [
      {
        "title": "Deployment Successful!",
        "description": `\n\n<t:${Math.floor(Date.now()/1000)}:R>`,
        "color": 1815365,
        "author": {
          "name": "GitAutoDeploy",
          "url": "https://github.com/DEPSTRCZ/Git-Auto"
        },
        "footer": {
          "text": "© DEPSTRCZ"
        }
      }
    ],
    "attachments": []
  }
export const failed = {
    "content": null,
    "embeds": [
      {
        "title": "Deployment Failed!",
        "description": `*Check terminal for more details*\n\n<t:${Math.floor(Date.now()/1000)}:R>`,
        "color": 14322432,
        "author": {
          "name": "GitAutoDeploy",
          "url": "https://github.com/DEPSTRCZ/Git-Auto"
        },
        "footer": {
          "text": "© DEPSTRCZ"
        }
      }
    ],
    "attachments": []
  }
export const unauthorized = {
    "content": null,
    "embeds": [
      {
        "title": "Danger unauthorized request",
        "description": `An unverified request was catched! Look into terminal for more details\n\n<t:${Math.floor(Date.now()/1000)}:R>`,
        "color": 14286848,
        "author": {
          "name": "GitAutoDeploy",
          "url": "https://github.com/DEPSTRCZ/Git-Auto"
        },
        "footer": {
          "text": "© DEPSTRCZ"
        }
      }
    ],
    "attachments": []
  }
  //\`\`${request.socket.remoteAddress}\`\`