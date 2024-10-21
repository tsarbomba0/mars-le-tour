import { DiscordClient } from './classes/DiscordClient'
import { token } from './constants'
const client = new DiscordClient(token)

client.on('messageCreate', (msg) => {
    if(msg.author.id == '1288517603337179166'){
        return;
    }
    client.sendMessage("Test!", msg.channel_id)
})
 