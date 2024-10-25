import { stringOption } from "../classes/Option"
import { SlashCommand } from "../classes/SlashCommand"
import { token2 } from "../constants";
const url = "https://discord.com/api/v10/applications/1297950911297093682/guilds/1296135465782480977/commands"

/*
This file is merely a experiment!
*/
let data = {};


const header = {
    "User-Agent": "mars-le-tour 1.0.0",
    "Authorization": `Bot ${token2}`,
    "Content-Type": "application/json"
}
console.log(data)
const resp = await fetch(url, {
    method: "POST",
    headers: header,
    body: JSON.stringify(data)
})
console.log(resp)