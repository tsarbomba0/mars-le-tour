import { token2 } from "../constants";
const GuildURL = "https://discord.com/api/v10/applications/1297950911297093682/guilds/1296135465782480977/commands"
const GlobalURL = "https://discord.com/api/v10/applications/1297950911297093682/commands"
let resp;

/*
This file is merely a experiment!
*/

/*
Small script to push Command data to the Discord HTTP API
to register them.
*/

const data = {} 
/*
data object should be a command's module file with exporting a data object made with
any of the 4 Command classes.
*/

if(process.argv.length < 4){
    console.log("Not enough arguments!")
} else {
    const header = {
        "User-Agent": "Mars-le-tour 1.0.0",
        "Authorization": `Bot ${token2}`,
        "Content-Type": "application/json"
    }
    switch(process.argv[3]){
        case 'guild':
            resp = await fetch(GlobalURL, {
                method: "POST",
                headers: header,
                body: JSON.stringify(data)
            })
            console.log(resp)
        break;
        case 'global':
            resp = await fetch(GuildURL, {
                method: "POST",
                headers: header,
                body: JSON.stringify(data)
            })
            console.log(resp)
        break;
        default: 
            console.log("Wrong option, the correct ones are: guild, global")
        break;
    } 
}





