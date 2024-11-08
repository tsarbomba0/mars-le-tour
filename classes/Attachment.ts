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
    /**
     * Sets the filename used by the attachment
     * @param {string} filename 
     * @returns {Attachment}
     */
    public setFilename(filename: string): Attachment{
        this.filename = filename
        return this
    }
    /**
     * Sets the Attachment's ID, must be the same as the id of the file sent with it.
     * @param {string} id 
     * @returns {Attachment}
     */
    public setID(id: string): Attachment {
        this.id = id
        return this
    }
    /**
     * Sets the Attachment's title.
     * @param {string} title 
     * @returns {Attachment}
     */
    public setTitle(title: string): Attachment {
        this.title = title
        return this
    }

    /**
     * Sets the Attachment's description.
     * @param {string} description
     * @returns {Attachment}
     */
    public setDescription(description: string): Attachment {
        this.description = description
        return this
    }
    /**
     * Sets the Attachment's content type.
     * @param {string} description
     * @returns {Attachment}
     */
    public setType(type: string): Attachment {
        this.content_type = type
        return this
    }
    /**
     * Sets the resolution for the Attachment's video/image
     * @param {number} height 
     * @param {number} width 
     * @returns {Attachment}
     */
    public setResolution(height: number, width: number): Attachment{
        this.height = height
        this.width = width
        return this
    }

    /**
     * Flags the attachment as ephemeral
     * @returns {Attachment}
     */
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
     * @returns {Attachment}
     */
    public finalize(){
        let returnObject = {}
        Object.getOwnPropertyNames(this).forEach((property) => {
            this[property] ? returnObject[property] = this[property] : false
        })
        return returnObject as Attachment
    }
}  