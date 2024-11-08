export enum selectMenuTypes {
    text = 3,
    user = 5,
    role = 6,
    mentionable = 7,
    channels = 8
}

export class SelectMenu {
    // Properties
    type: selectMenuTypes
    custom_id: string
    options?: Array<Object> // Select Option type
    channel_types?: Array<Object> // Channel types type
    placeholder?: string
    default_values?: Array<Object> // Default value object
    min_values?: number
    max_values?: number
    disabled?: boolean
    
    // Methods
    /*
    Sets the type of the Menu
    */
    setType(type: selectMenuTypes){
        this.type = type
        return this
    }
    /*
    Adds a option, only available for Text menus
    */
    addOptions(option: Object){
        if(this.type !== 3){
            throw new Error("Options are only available for type 3 Select Menus (Text)")
        }
        this.options?.push(option)
        return this
    }
    /*
    Sets the Channel Type array, only for Channel menus
    */
    setChannelTypes(types: Array<Object>){
        if(this.type !== 8)throw new Error("Channel types can only be set on type 8 Select Menus (Channel)")
        this.channel_types = types
    }
    /*
    Sets the placeholder text
    */
    setPlaceholder(text: string){
        if(text.length > 150)throw new Error("Maximum placeholder length is 150 characters.")
        this.placeholder = text
        return this
    }
    /*
    Sets the default values for a menu, any menu except the Text menu
    */
    setDefaultValues(defaultValues: Array<object>){
        if(this.type ===3)throw new Error("Default values only available for types 5,6,7 and 8")
        this.default_values = defaultValues
        return this
    }
    /*
    Sets the minimum amount of chosen values
    */
    setMinimumChosen(number: number){
        this.min_values = number
        return this
    }
    /*
    Sets the maximum amount of chosen values
    */
    setMaximumChosen(number: number){
        this.max_values = number
        return this
    }
    /*
    Disables the menu
    */
    disable(){
        this.disabled = true
        return this
    }
    /*
    Returns the class as a object
    */
    finalize(){
        let returnObject = {}
        Object.getOwnPropertyNames(this).forEach((property) => {
            if(this[property])returnObject[property]=this[property]
        })
        return returnObject
   }
}