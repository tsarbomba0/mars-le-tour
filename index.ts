import { DiscordClient } from './classes/DiscordClient'
import { token } from './constants'
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
    console.log(`${client.guilds.size}`)
})