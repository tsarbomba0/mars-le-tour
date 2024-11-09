import { REST } from "../rest/REST";
import { discordChannel } from "../types/Discord/discordChannel";
import { Emoji } from "../types/Media/Emoji";
import { MessageRequest } from "../types/Discord/discordMessageOptions";
import { mediaSend } from "../util/mediaSend";
import { User } from "./Guild/User";
let botToken: string;

/**
 * A type for the value in the maps used for channel classes
 * represents a number, boolean, string, Array of objects, Emoji or null
 */
type channelMapValue = number|null|boolean|string|Array<object>|Emoji|undefined|Map<string, User>

/**
 * Class for a Discord Voice Channel 
 */
export class VoiceChannel extends Map<string, channelMapValue> {
    id: string;
    parentId: string;
    name: string;
    /* TODO: decide
    version: number;
    type: number = 2;
    rtc_region: string|null;
    rate_limit_per_user: number;
    position: number;
    user_lim it: number|null;
    iconEmoji: Emoji;
    flags: number;
    bitrate: number;
    */
    constructor(payload: discordChannel, token: string){
        super();
        this.id = payload.id;
        this.parentId = payload.parent_id!;
        this.name = payload.name;
        this.set("id", payload.id)
        this.set("parentId", payload.parent_id)
        this.set("name", payload.name)
        this.set('name', payload.name);
        this.set('version', payload.version);
        this.set('rtc_region', payload.rtc_region);
        this.set('rate_limit_per_user', payload.rate_limit_per_user);
        this.set('position', payload.position);
        this.set('user_limit', payload.user_limit);
        this.set('icon_emoji', payload.icon_emoji); // Note the change in key to match payload
        this.set('flags', payload.flags);
        this.set('bitrate', payload.bitrate);
    }
}
/**
 * Class for a Discord Direct Message Channel 
 */
export class DMChannel extends Map<string, channelMapValue> {
    id: string;
    flags: number;
    constructor(payload: discordChannel, token: string){
        super()
        console.log(payload)
        this.id = payload.id
        this.flags = payload.flags

        this.set("id", payload.id)
        this.set("flags", payload.flags)
        this.set("recipients", new Map<string, User>())
        payload.recipients?.forEach((user) => {
            (this.get("recipients") as Map<string, User>).set(user.id, new User(user))
        })
        
        botToken = token
    }
    /**
     * Sends a message to the channel
     * @param {MessageRequest} message Message to send.
     * @param {filepath}[filepath] filepath Array of paths to media files.
     */
    public async sendMessage(message: MessageRequest, filepath?: Array<string>): Promise<void>{
        let response;
        // If the message contains attachments, attempt to make a multipart request
        if(filepath !== undefined){
            // Multi-part request
            let request = mediaSend(filepath, message)   
            let response = await REST.Channels.post(this.id, request.finalize(), 'messages', botToken, `multipart/form-data; boundary=${request.boundary}`)     
        } else {
            response = await REST.Channels.post(this.id, message, 'messages', botToken)
            console.dir((await response), { depth: null })
        }
    }
    /**
     * Deletes a message.
     * @param {string} id ID of the Message to delete in the channel
     */
    public async deleteMessage(id: string): Promise<void> {
        let response = await REST.Channels.HTTPDelete(this.id, `messages/${id}`, botToken)
        console.log((await response))
    }
     /**
     * Creates a reaction.
     * @param {string} messageId ID of the target Message
     * @param {string} emojiName Name of the emoji (if using custom emoji => name:id)
     */
    public async reactMessage(messageId: string, emojiName: string): Promise<void>{
        let response = await REST.Channels.put(this.id, `/messages/${messageId}/reactions/${emojiName}/@me`, botToken)
        console.log((await response))
    }
}
/**
 * Class for a Discord Guild Channel 
 * @params {discordChannel} payload
 */
export class GuildChannel extends Map<string, channelMapValue> {
    id: string;
    name: string;
    parentId: string;
    /* TODO: decide
    type: number; 
    topic: string|null;
    rateLimit: number;
    position: number;
    permissionOverwrites: Array<object>;
    lastMessageId: string;
    icon_emoji: Emoji
    flags: number;
    */
    constructor(payload: discordChannel, token: string){
        super();
        this.id = payload.id
        this.parentId = payload.parent_id!
        this.name = payload.name
        this.set('topic', payload.topic);
        this.set('rateLimit', payload.rate_limit_per_user);
        this.set('position', payload.position);
        this.set('permissionOverwrites', payload.permission_overwrites);
        this.set('parentId', payload.parent_id);
        this.set('name', payload.name);
        this.set('lastMessageId', payload.last_message_id);
        this.set('id', payload.id);
        this.set('icon_emoji', payload.icon_emoji);
        this.set('flags', payload.flags);
        botToken = token

    }

    /**
     * Sends a message to the channel
     * @param {MessageRequest} message Message to send.
     * @param {filepath}[filepath] filepath Array of paths to media files.
     */
    public async sendMessage(message: MessageRequest, filepath?: Array<string>): Promise<void>{
        let response;
        // If the message contains attachments, attempt to make a multipart request
        if(filepath){
            // Multi-part request
            let request = mediaSend(filepath, message)   
            let response = await REST.Channels.post(this.id, request.finalize(), 'messages', botToken, `multipart/form-data; boundary=${request.boundary}`)     
        } else {
            response = await REST.Channels.post(this.id, message, 'messages', botToken)
            console.dir((await response), { depth: null})
        }
    }  

    /**
     * Deletes a message.
     * @param id ID of the Message to delete in the channel
     */
    public async deleteMessage(id: string): Promise<void> {
        let response = await REST.Channels.HTTPDelete(this.id, `messages/${id}`, botToken )
        console.log((await response))
    }

     /**
     * Creates a reaction.
     * @param messageId ID of the target Message
     * @param emojiName Name of the emoji (if using custom emoji => name:id)
     */
     public async reactMessage(messageId: string, emojiName: string): Promise<void>{
        let response = await REST.Channels.put(this.id, `/messages/${messageId}/reactions/${emojiName}/@me`, botToken)
        console.log((await response))
     }
}