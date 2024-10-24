import { OptionChoices } from "../types/choices";
import { OptionType } from "../enums/OptionType";
import { Options } from "../types/Options";

export class integerOption {
    optionObject: Options 
    constructor (name: string, description: string, ifRequired?: boolean, choices?: Array<OptionChoices>){
        this.optionObject = {
            name: name,
            description: description,
            type: OptionType.integer,
            options: [] as Array<Options>
        }
        if(choices){
            this.optionObject['choices'] = choices 
        }
        if(ifRequired !== undefined){
            this.optionObject['required'] = ifRequired
        } else {
            this.optionObject['required'] = false
        }
    }

    addSubcommand(subcmd: integerOption){
        this.optionObject['options']!.unshift(subcmd.optionObject)
        return this
    }

    finalize(){
        return this.optionObject
    }
}

export class stringOption {
    optionObject: Options 
    constructor (name: string, description: string, ifRequired?: boolean, choices?: Array<OptionChoices>){
        this.optionObject = {
            name: name,
            description: description,
            type: OptionType.string,
            options: [] as Array<Options>
        }
        if(choices){
            this.optionObject['choices'] = choices 
        }
        if(ifRequired !== undefined){
            this.optionObject['required'] = ifRequired
        } else {
            this.optionObject['required'] = false
        }
    }

    addSubcommand(subcmd: stringOption){
        this.optionObject['options']!.unshift(subcmd.optionObject)
        return this
    }

    finalize(){
        return this.optionObject
    }
}

export class booleanOption {
    optionObject: Options 
    constructor (name: string, description: string, ifRequired?: boolean, choices?: Array<OptionChoices>){
        this.optionObject = {
            name: name,
            description: description,
            type: OptionType.boolean,
            options: [] as Array<Options>
        }
        if(choices){
            this.optionObject['choices'] = choices 
        }
        if(ifRequired !== undefined){
            this.optionObject['required'] = ifRequired
        } else {
            this.optionObject['required'] = false
        }
    }

    addSubcommand(subcmd: booleanOption){
        this.optionObject['options']!.unshift(subcmd.optionObject)
        return this
    }

    finalize(){
        return this.optionObject
    }
}