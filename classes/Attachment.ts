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
    ephemeral?: boolean
    duration_secs?: number;
    waveform?: string;
    flags?: string;

    constructor(){
        this.id = generateDiscordSnowflake(2000, 2000).toString()
    }

    public setFilename(filename: string): Attachment{
        this.filename = filename
        return this
    }

    public setUrl(url: URL): Attachment{
        this.url = url
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