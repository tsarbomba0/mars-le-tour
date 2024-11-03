import { URL } from "../types/Media/URL";
import { generateDiscordSnowflake } from "../util/SnowflakeGenerator";

/**
 * Class for a Discord Attachment
 */
export class Attachment {
    id: string;
    filename?: string;
    title?: string;
    description?: string; 
    content_type?: string;
    size?: number;
    url?: string;
    proxy_url?: string;
    height?: number
    width?: number
    ephemeral?: boolean = false;

    // Voice messages only
    duration_secs?: number;
    waveform?: string;

    flags?: string;

    constructor(){
        
    }

    public setFilename(filename: string): Attachment{
        this.filename = filename
        return this
    }
    public setID(id: string): Attachment {
        this.id = id
        return this
    }

    public setTitle(title: string): Attachment {
        this.title = title
        return this
    }

    public setDescription(description: string): Attachment {
        this.description = description
        return this
    }

    public setType(type: string): Attachment {
        this.content_type = type
        return this
    }

    public setResolution(height: number, width: number): Attachment{
        this.height = height
        this.width = width
        return this
    }

    public isEphemeral(): Attachment {
        this.ephemeral = true
        return this
    }

    /**
     * Sets the flags for the attachment
     * @param flags Bitfield of the attachment flags (Currently only flag is the Remix flag, which is 1 << 2)
     * @returns Attachment
     */
    public setFlags(flags: string): Attachment{
        this.flags = flags
        return this
    }

    /**
     * Returns a Attachment object with only values that are not undefined
     * @returns Attachment
     */
    public finalize(){
        let returnObject = {}
        Object.getOwnPropertyNames(this).forEach((property) => {
            this[property] ? returnObject[property] = this[property] : false
        })
        return returnObject as Attachment
    }
}  