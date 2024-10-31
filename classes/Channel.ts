import { User } from "../classes/Guild/User";
import { ChannelTypes } from "../enums/ChannelTypes";
import { discordChannel } from "../types/Discord/discordChannel";
import { Emoji } from "../types/Media/Emoji";
import { CategoryChannel } from "./CategoryChannel";


/**
 * A type for the value in the maps used for channel classes
 * represents a number, boolean, string, Array of objects, Emoji or null
 */
type channelMapValue = number|null|boolean|string|Array<object>|Emoji

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
    user_limit: number|null;
    iconEmoji: Emoji;
    flags: number;
    bitrate: number;
    */
    constructor(payload: discordChannel){
        super();
        this.id = payload.id;
        this.parentId = payload.parent_id;
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
    parentId: string;
    constructor(payload){
        super(payload)
        this.id = payload.id
        this.parentId = payload.parent_id
    }
}
/**
 * Class for a Discord Guild Channel 
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
    constructor(payload: discordChannel){
        super();
        this.id = payload.id
        this.parentId = payload.parent_id
        this.name = payload.name
        this.set('type', 0);
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
    }
}