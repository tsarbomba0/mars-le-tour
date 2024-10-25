import { Events } from './enums/Events'
import { DiscordClient } from './classes/DiscordClient'
import { integerOption, stringOption } from './classes/Option'
import { SlashCommand } from './classes/SlashCommand'
import { token, token2 } from './constants'
import { Guild } from './types/Guild'
import { Interaction } from './classes/Interaction'
const client = new DiscordClient(token2)

client.on('messageCreate', (msg) => {
    if(msg.author.id == client.user.id){
        return;
    }
    console.log(client.guilds)
})
 
client.on('ready', (a) => {
    console.log("Mars-le-tour!")
    console.log(`${client.user.username} is ready!`)
})

client.on(Events.interactionCreate, (interaction: Interaction) => {
    console.log("A")
    console.log(interaction)
    interaction.defer()
    setTimeout(() => {
        interaction.reply({ content: "hah!", ephemeral: true})
    }, 5000)
})