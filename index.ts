import { Events } from './enums/Events'
import { DiscordClient } from './classes/DiscordClient'
import { token, token2 } from './constants'
import { Interaction } from './classes/interactions/Interaction'
import { ActionRow } from './classes/Components/ActionRow'
import { TextInput } from './classes/components/TextInput'
import { Message } from './classes/Message'
import { Attachment } from './classes/Attachment'
const client = new DiscordClient(token2)

client.on(Events.messageCreate, async (msg: Message) => {
    if(msg.author.id == client.user.id){
        return;
    }

    const attach = new Attachment()
        .setID("0")
        .setFilename("testfile.jpg")
        .setDescription("A file!")
        .finalize()
    /*
    msg.channel?.sendMessage({ 
        content: "Test!"
    },
     ["D:\\Pobrane\\test.jpg","D:\\Pobrane\\IMG_0754.png"]
    )
    */
    if(msg.content === "TEST1"){
        msg.reply({ 
            content: "Test!"
        },
         ["D:\\Pobrane\\test.jpg","D:\\Pobrane\\IMG_0754.png"]
        )
    }
    if(msg.content === "TEST2"){
        let DM = await client.createDM(msg.author.id)
        console.log(DM)
        DM.sendMessage({
            content: "Test!"
        })

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