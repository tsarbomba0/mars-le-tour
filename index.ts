import { DiscordClient } from './classes/DiscordClient'
import { integerOption, stringOption } from './classes/Option'
import { SlashCommand } from './classes/SlashCommand'
import { token, token2 } from './constants'
import { Guild } from './types/Guild'
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
    let guild1 = client.guilds.get('1289659066746015785')
    let newid = {
        id: 2
    }
    let test: any = {
        data: new SlashCommand()
                .addName("Test")
                .addDescription("testing")
                .addOption(
                    new integerOption('test', 'testing')
                    .addSubcommand(new integerOption('test2', 'test2'))
                    .finalize()
                )
                .addOption(
                    new stringOption('test123', 'testing123')
                    .addSubcommand(new stringOption('teststring', 'teststring123'))
                    .finalize()
                )
                .setChannelTypes([0,1,2,3])
                .finalize()

    }
    console.log(test.data)
})