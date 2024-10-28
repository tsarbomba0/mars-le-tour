import { Events } from './enums/Events'
import { DiscordClient } from './classes/DiscordClient'
import { integerOption, stringOption } from './classes/Option'
import { SlashCommand } from './classes/interactions/SlashCommand'
import { token, token2 } from './constants'
import { Guild } from './types/Guild/Guild'
import { Interaction } from './classes/interactions/Interaction'
import { Embed } from './classes/Embed'
import { Button } from './classes/Components/Button'
import { ActionRow } from './classes/Components/ActionRow'
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

client.on(Events.interactionCreate, async (interaction: Interaction) => {
    if(interaction.name = "test"){
        await interaction.reply({ content: "Death", components: [new ActionRow([new Button()
            .setLabel("Ahahaha!")
            .setCustomID("hehehe!")
            .setStyle(1)
            .finalize()
        ]).finalize()]})
        setTimeout(async () => {
            console.log("Aha?")
            await interaction.delete()
        }, 5000)
    }
})


/*
[Object ...]
.setColor('#000000')
        .setAuthor({ name: 'mars-le-tour'})
*/