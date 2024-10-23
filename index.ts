import { DiscordClient } from './classes/DiscordClient'
import { token } from './constants'
import { Guild } from './types/Guild'
const client = new DiscordClient(token)

client.on('messageCreate', (msg) => {
    if(msg.author.id == '1288517603337179166'){
        return;
    }
    console.log(client.guilds)
})
 
client.on('ready', (a) => {
    console.log("Mars-le-tour!")
    console.log(`${client.user.username} is ready!`)
    let guild1 = client.guilds.get('1289659066746015785')
    let newid = {
        id: 2
    }
    if(guild1){
        console.log(Object.entries(guild1))
        let asd = Object.entries(guild1).reduce((obj, [k,v]) => Object.assign(obj, {[k]:newid[v]}, {}))
        console.log(asd)
    }
    
})