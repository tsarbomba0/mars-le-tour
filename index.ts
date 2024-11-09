import { Events } from './enums/Events'
import { DiscordClient } from './classes/DiscordClient'
import { token, token2 } from './constants'
import { Interaction } from './classes/interactions/Interaction'
import { TextInput } from './classes/components/TextInput'
import { Message } from './classes/Message'
import { Attachment } from './classes/Attachment'
import { ActionRow } from './classes/components/ActionRow'
import { discordPresenceUpdate } from './types/Discord/discordPresence'
import { ActivityTypes } from './enums/ActivityTypes'
const client = new DiscordClient(token2, {
    name: "test",
    type: ActivityTypes.custom,
    status: "idle"
})


client.on(Events.presenceUpdate, async (presence: discordPresenceUpdate) => {
    console.log(presence)
})
client.on(Events.messageCreate, async (msg: Message) => {
    if(msg.author.id == client.user.id){
        return;
    }

    const attach = new Attachment()
        .setID("0")
        .setFilename("testfile.jpg")
        .setDescription("A file!")
        .finalize()
   
    if(msg.content === "TEST1"){
        console.log(client.guilds.get(msg.guildId!))
        client.setPresence(ActivityTypes.watching, "dnd", 0, "Assez de sang.")
        msg.reply({ 
            content: "Test!"
        },
         ["/home/user/Downloads/janedoe1.jpg"]
        )
        
    }
    if(msg.content === "TEST2"){
        let DM = await client.createDM(msg.author.id)
        console.log(DM)
        DM.sendMessage({
            content: "Test!"
        }, ["/home/user/Downloads/janedoe1.jpg"])

    }

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