export enum TextInputStyles {
    short = 1, /// Single-line
    paragraph = 2 /// Multi-line
}

export class TextInput {
    type: number = 4;
    custom_id: string;
    style: TextInputStyles;
    label: string;
    min_length?: number;
    max_length?: number;
    required?: boolean;
    value?: string;
    placeholder?: string

    /// Methods

    /**
     * Sets the Custom ID of the Component.
     * @param id
     * @returns TextInput
    */
    setCustomID(id: string): TextInput{
        if(id.length > 100)throw new Error("Custom IDs are at most 100 characters long!")
        this.custom_id = id
        return this
    }
    /**
     * Sets the style for the Component. 
     * @param style
     * @returns TextInput
    */ 
    setStyle(style: TextInputStyles): TextInput {
        this.style = style
        return this
    }  
    /**
     * Sets the Component's label
     * @param label
     * @returns TextInput
     */
    setLabel(label: string): TextInput {
        if(label.length > 45){
            throw new Error("Label can be 45 characters at most!")
        }
        this.label = label
        return this
    }

    /**
     * Sets the minimum length for a Text Input
     * @param length 
     * @returns TextInput
     */
    setMinimumLength(length: number): TextInput {
        this.min_length = length
        return this
    }
    /**
     * Sets the maximum length for a Text Input
     * @param length 
     * @returns TextInput
     */
    setMaximumLength(length: number): TextInput {
        this.max_length = length
        return this
    }
    /**
     * Sets if the Text Input is required to be filled in
     * @returns TextInput
     */
    isRequired(): TextInput {
        this.required = true
        return this
    }
    /**
     * Sets the pre-filled value for a component
     * maximum 4000 characters.
     * @param value
     * @returns TextInput
     */
    setValue(value: string): TextInput {
        if(value.length > 4000){
            throw new Error("Value can be 4000 characters at most!")
        }
        this.value = value
        return this
    }
    /**
     * Sets the placeholder text is the input is empty
     * maximum 100 characters.
     * @param placeholder
     * @returns TextInput
     */
    setPlaceholder(placeholder: string): TextInput {
        if(placeholder.length > 100){
            throw new Error("Placeholder text can be 100 characters at most!")
        }
        this.placeholder = placeholder
        return this 
    }


}
