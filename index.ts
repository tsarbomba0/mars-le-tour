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
import { Attachment } from './classes/Attachment'
import { MultiPartRequest } from './util/multipartRequest'
const fs = require('fs')
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
    let Request = new MultiPartRequest('--HIHI')
        .insertBoundary()
        .contentDisposition("name=\"payload_json\"")
        .contentType("application/json\r\n")
        .insertStringData(JSON.stringify({
            content: "Hah!",
            attachments: [attach]
        }, null, 2))
        .insertBoundary()
        .contentDisposition("name=\"files[0]\"; filename=\"testfile.jpg\"")
        .contentType(`image/jpeg`)
        .contentTransferEncoding('base64')
        .insertCRLF()
        .insertBase64("D:\\Pobrane\\test.jpg")
        .endBoundary()
        .finalize()
        
    msg.channel?.sendMessage(Request)

})

/**
 * console.log(
    new MultiPartRequest()
    .boundary("--123")
    .contentDispositon("name=\"test\"")
    .contentType("application/json")
    .insertStringData(JSON.stringify({
        content: "ABC",
    }, null, 2))
    .boundary("--123")
    .contentDispositon("name=\"files[0]\"; filename=\"testfile.png\"")
    .contentType("image/png")
    //.insertBuffer('D:\\Pobrane\\test.jpg')
    .boundary("--123--")
    .data
)
 */
 
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