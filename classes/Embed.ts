import { cmykCodes, hexCode, rgbCodes } from "../types/ColorCodes";
import { EmbedAuthor } from "../types/EmbedAuthor.ts";
import { EmbedField } from "../types/EmbedField.ts";
import { EmbedFooter } from "../types/EmbedFooter.ts";
import { EmbedProvider } from "../types/EmbedProvider.ts";
import { Image } from "../types/Image.ts";
import { URL } from "../types/URL.ts";
import { Video } from "../types/Video.ts";

const date = new Date()
let timeVar: Date; 
export class Embed {
    // Properties
    title: string;
    type: string = "rich";
    description: string;
    url?: URL;
    timestamp?: string;
    color?: number
    footer?: EmbedFooter; 
    image?: Image; 
    thumbnail?: Image; 
    video?: Video ; 
    provider?: EmbedProvider; 
    author?: EmbedAuthor; 
    fields?: Array<EmbedField> = []; 

    // Methods
    /*
    Embed title
    */
    setTitle(title: string){
        this.title = title;
        return this
    }
    /*
    Not useful, sets type
    */
    setType(type: string){
        this.type = type
        return this
    }
    /*
    Sets the description
    */
    setDescription(description: string){
        this.description = description
        return this
    }
    /*
    Embed URL
    */
    setURL(url: URL){
        this.url = url 
        return this
    }
    /*
    Timestamp
    */
    setTimestamp(){
        let days = date.getUTCDay().toString.length === 1 ? date.getUTCDay() : `0${date.getUTCDay()}`
        let months = date.getUTCMonth().toString.length === 1 ? date.getUTCMonth() : `0${date.getUTCMonth()}`
        let hours = date.getUTCHours().toString.length === 1 ? date.getUTCHours() : `0${date.getUTCHours()}`
        this.timestamp = `${date.getUTCFullYear()}-${months}-${days}T${hours}:${date.getUTCMinutes()}:${date.getUTCSeconds()}.000Z`
        return this
    }
    /*
    Sets the color (supports: hex codes, rgb notation and cmyk notation)
    */
    setColor(color: hexCode | cmykCodes | rgbCodes){
        let temp: Array<string>
        let hexCode = "0x"
        
        console.log(color.match(/^#.{6}/)?.input)
        switch((color as string)){
            case color.match(/^#.{6}/)?.input:
                console.log("hihi!")
                this.color = parseInt((color.replace("#", "") as string), 16)
            break;
            case color.match(/^rgb/)?.input:
                let rgbNumbers = color.match(/^rgb/)?.input?.replace("(", '').replace("rgb",'')
                rgbNumbers?.split(',').forEach((colorNumber) => {
                    let tmp = parseInt(colorNumber)/16
                    let remainder = tmp = Math.floor(tmp)
                    let value = parseInt(`${tmp + remainder*16}`, 16)
                    hexCode = hexCode.concat(value.toString())
                })
                this.color = parseInt(hexCode, 16)
            break;
            case color.match(/^cmyk/)?.input:
                let cmykNumbers = color.match(/^cmyk/)?.input?.replace("(", '').replace("rgb",'').split(',')
                let firstNum = 255 * (1-parseInt(cmykNumbers![0])) * (1-parseInt(cmykNumbers![3])) 
                let secondNum = 255 * (1-parseInt(cmykNumbers![1])) * (1-parseInt(cmykNumbers![3])) 
                let thirdNum = 255 * (1-parseInt(cmykNumbers![2])) * (1-parseInt(cmykNumbers![3])) 
                firstNum = parseInt(`${Math.floor(firstNum/16) + (firstNum/16 - Math.floor(firstNum/16))*16}`, 16)
                secondNum = parseInt(`${Math.floor(secondNum/16) + (secondNum/16 - Math.floor(secondNum/16))*16}`, 16)
                thirdNum = parseInt(`${Math.floor(thirdNum/16) + (thirdNum/16 - Math.floor(thirdNum/16))*16}`, 16)
                this.color = parseInt(`${firstNum}${secondNum}${thirdNum}`)
            break;
        }
        return this
    }
    /*
    Sets the footer
    */
    setFooter(footer: EmbedFooter){
        this.footer = footer
        return this
    }
    /*
    Sets the image
    */
    setImage(image: Image){
        this.image = image
        return this
    }
    /*
    Sets the thumbnail
    */
    setThumbnail(thumbnail: Image){
        this.thumbnail = thumbnail
        return this
    }
    /*
    Sets the video
    */
    setVideo(video: Video){
        this.video = video
        return this
    }
    /*
    Sets the provider
    */
    setProvider(provider: EmbedProvider){
        this.provider = provider
        return this
    }
    /*
    Author of the embed
    */
    setAuthor(author: EmbedAuthor){
        this.author = author
        return this
    }
    /*
    Adds a embed field
    */
    addFields(field: EmbedField){
        this.fields?.push(field)
        return this
    }
    // Returns the a JSON object for the embed
    finalize(){
        let returnObject = {}

        // let's only set properties in, not undefined ones
        Object.getOwnPropertyNames(this).map((property) => {
            console.log(property, this[property])
            if(this[property])returnObject[property] = this[property] 
        })

        return returnObject
    }
}