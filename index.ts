import { Events } from './enums/Events'
import { DiscordClient } from './classes/DiscordClient'
import { integerOption, stringOption } from './classes/Option'
import { SlashCommand } from './classes/interactions/SlashCommand'
import { token, token2 } from './constants'
import { Interaction } from './classes/interactions/Interaction'
import { Embed } from './classes/Embed'
import { Button } from './classes/Components/Button'
import { ActionRow } from './classes/Components/ActionRow'
import { TextInput } from './classes/components/TextInput'
import { Message } from './classes/Message'
const client = new DiscordClient(token2)

client.on(Events.messageCreate, (msg: Message) => {
    if(msg.author.id == client.user.id){
        return;
    }
    console.log(msg)
})
 
client.on('ready', (a) => {
    console.log("Mars-le-tour!")
    console.log(`${client.user.username} is ready!`)
})

client.on(Events.interactionCreate, async (interaction: Interaction) => {
    const modal = new ActionRow([
        new TextInput()
        .setCustomID("Test")
        .setLabel("Modal!")
        .setPlaceholder("Placeholder!")
        .setStyle(1)
        .isRequired()
    ]) 

    if(interaction.name === "test"){
        console.log(JSON.stringify(modal))
        await interaction.replyModal({ title: "Modal.", custom_id: "Modal", components: [modal]})
        console.log(interaction.guild?.get("id"))
    }

})