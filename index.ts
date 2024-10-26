import { Events } from './enums/Events'
import { DiscordClient } from './classes/DiscordClient'
import { integerOption, stringOption } from './classes/Option'
import { SlashCommand } from './classes/SlashCommand'
import { token, token2 } from './constants'
import { Guild } from './types/Guild'
import { Interaction } from './classes/Interaction'
import { Embed } from './classes/Embed'
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
    console.log("A")
    await interaction.defer()
    const embed = new Embed()
        .setTitle("Test title!")
        .setDescription('Test embed!')
        .addFields({ name: "test", value: "test", inline: true })
        .setAuthor({ name: "Hii!"})
        .setImage({ url: 'https://cataas.com/cat'})
        .setThumbnail({ url: 'https://cataas.com/cat'})
        .setColor('#5865F2')
        .setTimestamp()
        .finalize()
    console.log(embed)
    
    setTimeout(async () => {
        await interaction.editResponse({ embeds: [embed] })
    }, 1)
    
    
})


/*
[Object ...]
.setColor('#000000')
        .setAuthor({ name: 'mars-le-tour'})
*/