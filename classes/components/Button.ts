import { URL } from "../../types/Media/URL";

export class Button {
    // properties
    type: number = 2;
    style: number
    label?: string;
    emoji?: Object // Partial emoji
    custom_id?: string;
    sku_id?: string;
    url?: URL;
    disabled?: boolean;

    // methods

    /*
    Set a button style
    1 (Primary) => color: Blurple => required field: custom_id
    2 (Secondary) => color: Grey => required field: custom_id
    3 (Success) => color: Green => required field: custom_id
    4 (Danger) => color: Red => required field: custom_id
    5 (Link) => color: Grey => required field: url
    6 (Premium) => color: Blurple => required field: sku_id (Cannot have custom_id, label, url, emoji)
    */
    setStyle(style: 1|2|3|4|5|6): Button {
        this.style = style
        return this
    }

    /*
    Sets a label for the button
    */
    setLabel(label: string): Button {
        this.label = label
        return this
    }
    /*
    Sets a emoji
    */
    setEmoji(emoji: Object): Button{
        this.emoji = emoji
        return this
    }
    /*
    Sets the custom_id field (MOSTLY REQUIRED!)
    */
    setCustomID(id: string): Button{
        this.custom_id = id
        return this
    }
    /*
    Sets the ID for the SKU (Required for the Premium button <type 6>)
    */
    setSKU(sku: string): Button{
        this.sku_id = sku
        return this
    }
    /*
    Sets the URL for the Button, if it's a link button.
    */
    setURL(url: URL): Button {
        this.url = url
        return this
    }
    /*
    Disables the button
    */
    disable(bool: boolean): Button {
        this.disabled = bool
        return this
    }
    /*
    Returns information as a Object
    */
    finalize(): Object {
        let returnObject = {}
        Object.getOwnPropertyNames(this).forEach((property) => {
            if(this[property])returnObject[property] = this[property]
        })
        return returnObject
    }
}