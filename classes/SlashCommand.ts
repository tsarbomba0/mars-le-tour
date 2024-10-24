import { OptionType } from "../enums/OptionType.ts";
import { OptionChoices } from "../types/Choices.ts";
import { Localization } from "../types/Localizations.ts";
import { Options } from "../types/Options.ts";
import { integerOption } from "./Option.ts";

export class SlashCommand {
    private commandJSON = {  // Chat Input Interaction
        type: 1, 
        options: [] as Array<Object>
    } 

    addName(name: string): SlashCommand{
        this.commandJSON['name'] = name;
        return this
    }
    addDescription(desc: string): SlashCommand{
        this.commandJSON['description'] = desc
        return this
    }

    addOption(newOption: Options): SlashCommand{
        this.commandJSON.options.unshift(newOption)
        return this
    }
    

    addLocalization(place: 'name'|'description', locales: Localization): SlashCommand{ 
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

    setChannelTypes(channeltypes: Array<number>): SlashCommand{ // channel type type soon
        this.commandJSON['channel_types'] = channeltypes;
        return this
    }

    setNSFW(bool: boolean){
        this.commandJSON['nsfw'] = true;
        return this
    }

    setIntegrationType(types){
        // later
        return this
    }
    finalize(): Object{ // Return JSON
        return this.commandJSON
    }

}