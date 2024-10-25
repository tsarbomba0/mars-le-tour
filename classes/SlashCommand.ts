import { EntryPointHandler } from "../enums/EntryPointHandler.ts";
import { InstallationContext } from "../enums/InstallationContext.ts";
import { InteractionContext } from "../enums/InteractionContext.ts";
import { Localization } from "../types/Localizations.ts";
import { Options } from "../types/Options.ts";



export class BaseCommand {
    commandJSON = {

    }
    /*
    Adds Localization
    */
    addLocalization(place: 'name'|'description', locales: Localization){ 
        switch(place){
            case 'name':
                this.commandJSON['name_localizations'] = locales;
            break;
            case 'description':
                this.commandJSON['description_localizations'] = locales;
            break;  
        }
        return this
    }

    /*
    Sets the channel types in which the command can be executed
    */
    setChannelTypes(channeltypes: Array<number>){ // channel type type soon
        this.commandJSON['channel_types'] = channeltypes;
        return this
    }

    /*
    sets the NSFW flag 
    */
    setNSFW(bool: boolean){
        this.commandJSON['nsfw'] = true;
        return this
    }

    /*
    Sets the Context in which the command is usable
    */
    setContext(contextNum: Array<InteractionContext>){
        this.commandJSON['contexts'] = contextNum
        return this
    }

    /*
    sets Default Member permissions TODO!
    */
    setDefaultMemberPermissions(permissions: Array<number>){
        // TODO
        return this
    }
    /*
    Set integration types (Where the command can be installed)
    */
    setIntegrationType(types: Array<InstallationContext>){
        this.commandJSON['integration_types'] = types
        return this
    }
    finalize(): Object{ // Return JSON
        return this.commandJSON
    }
}

/*
Slash Command class, extends the BaseCommand
contains the addOption method.
*/
export class SlashCommand extends BaseCommand{
    constructor(){
        super()
    }
    commandJSON = {  
        type: 1, // Chat Input Interaction
        options: [] as Array<Options>
    }
    /*
    Adds a option
    */
    addOption(newOption: Options): SlashCommand{
        this.commandJSON.options.unshift(newOption)
        return this 
    }
}

/*
Message Command class, for commands binded to messages on Discord
*/
export class MessageCommand extends BaseCommand{
    constructor(){
        super()
    }
    commandJSON = {  
        type: 2, // Message Interaction
    }
}

/*
User Command class, for commands binded to users on discord.
*/
export class UserCommand extends BaseCommand{
    constructor(){
        super()
    }
    commandJSON = {  
        type: 1, // Chat Input Interaction
    }
}

/*
Primary Entry Point Command class, for commands 
*/
export class PrimaryEntryPointCommand extends BaseCommand{
    constructor(){
        super()
    }
    commandJSON = {  
        type: 4, // Primary Entry Point interaction
    }
    setHandler(handler: EntryPointHandler){
        this.commandJSON['handler'] = handler
        return this
    }
}