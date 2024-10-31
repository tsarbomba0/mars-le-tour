import { discordGuildOptions } from "../../types/Discord/discordGuildOptions";
import { Emoji } from "../../types/Media/Emoji";
import { URL } from "../../types/Media/URL";
import { DMChannel, GuildChannel, VoiceChannel } from "../Channel";
import { GuildMember } from "./GuildMember";
import { Role } from "./Role";
const ImageUrl = "https://cdn.discordapp.com"

/**
 * Class for a Discord Guild
 */
export class Guild extends Map {
    id: string; 
    members: Array<GuildMember>;
    member_count: number;
    presences: Array<Object> // TODO: PARTIAL AND FULL PRESENCE OBJECTS
    channels: Map<string, DMChannel|VoiceChannel|GuildChannel> // TODO: CHANNEL OBJECT
    threads: Array<Object> // ^
    stage_instances: Array<object> // TODO: STAGE INSTANCE OBJECT
    guild_scheduled_events: Array<object> // TODO: SCHEDULED EVENT OBJECT
    soundboard_sounds: Array<object> // TODO: SOUNDBOARD SOUND OBJECT
    name: string | null;
    icon: string | null;
    icon_hash?: string | null;
    splash: string | null;
    discovery_splash: string | null;
    owner_id: string; 
    region?: string | null;
    afk_channel_id: string | null; 
    afk_timeout: number;
    widget_enabled?: boolean;
    widget_channel_id?: string | null; 
    verification_level: number;
    default_message_notification: number;
    explicit_content_filter: number;
    roles: Array<Role>; 
    emojis: Array<Emoji>; // TODO: EMOJI OBJECT
    features: Array<string> // TODO: GUILD FEATURE STRINGS
    mfa_level: number;
    application_id: string | null; 
    system_channel_id: string | null; 
    system_channel_flags: number; 
    rules_channel_id: string | null; 
    max_presences?: number | null;
    max_members?: number;
    vanity_url_code: string | null;
    description: string | null;
    banner: string | null;
    premium_tier: number;
    premium_subscription_count?: number;
    preferred_locale: string;
    public_updates_channel_id: string | null; // TODO: SNOWFLAKE
    max_video_channel_users?: number;
    max_stage_video_channel_users?: number;
    approximate_member_count?: number;
    approximate_presence_count: number;
    welcome_screen?: Object; // TODO: WELCOME SCREEN OBJECT
    nsfw_level: number;
    stickers?: Array<Object> // TODO: STICKER OBJECT
    premium_progress_bar_enabled: boolean;
    safety_alerts_channel_id: string; // TODO: SNOWFLAKE
    constructor(guildOptions: discordGuildOptions){
        super()
        this.id = guildOptions.id; 
        this.members = guildOptions.members;
        this.member_count = guildOptions.member_count;
        this.presences = guildOptions.presences; // TODO: PARTIAL AND FULL PRESENCE OBJECTS
        this.threads = guildOptions.threads; // ^
        this.stage_instances = guildOptions.stage_instances; // TODO: STAGE INSTANCE OBJECT
        this.guild_scheduled_events = guildOptions.guild_scheduled_events; // TODO: SCHEDULED EVENT OBJECT
        this.soundboard_sounds = guildOptions.soundboard_sounds; // TODO: SOUNDBOARD SOUND OBJECT
        this.name = guildOptions.name;
        this.icon = guildOptions.icon;
        this.icon_hash = guildOptions.icon_hash;
        this.splash = guildOptions.splash;
        this.discovery_splash = guildOptions.discovery_splash;
        this.owner_id = guildOptions.owner_id; 
        this.region = guildOptions.region;
        this.afk_channel_id = guildOptions.afk_channel_id; 
        this.afk_timeout = guildOptions.afk_timeout;
        this.widget_enabled = guildOptions.widget_enabled;
        this.widget_channel_id = guildOptions.widget_channel_id; 
        this.verification_level = guildOptions.verification_level;
        this.default_message_notification = guildOptions.default_message_notification;
        this.explicit_content_filter = guildOptions.explicit_content_filter;
        this.roles = guildOptions.roles; 
        this.emojis = guildOptions.emojis; // TODO: EMOJI OBJECT
        this.features = guildOptions.features; // TODO: GUILD FEATURE STRINGS
        this.mfa_level = guildOptions.mfa_level;
        this.application_id = guildOptions.application_id; 
        this.system_channel_id = guildOptions.system_channel_id; 
        this.system_channel_flags = guildOptions.system_channel_flags; 
        this.rules_channel_id = guildOptions.rules_channel_id; 
        this.max_presences = guildOptions.max_presences;
        this.max_members = guildOptions.max_members;
        this.vanity_url_code = guildOptions.vanity_url_code;
        this.description = guildOptions.description;
        this.banner = guildOptions.banner;
        this.premium_tier = guildOptions.premium_tier;
        this.premium_subscription_count = guildOptions.premium_subscription_count;
        this.preferred_locale = guildOptions.preferred_locale;
        this.public_updates_channel_id = guildOptions.public_updates_channel_id; // TODO: SNOWFLAKE
        this.max_video_channel_users = guildOptions.max_video_channel_users;
        this.max_stage_video_channel_users = guildOptions.max_stage_video_channel_users;
        this.approximate_member_count = guildOptions.approximate_member_count;
        this.approximate_presence_count = guildOptions.approximate_presence_count;
        this.welcome_screen = guildOptions.welcome_screen; // TODO: WELCOME SCREEN OBJECT
        this.nsfw_level = guildOptions.nsfw_level;
        this.stickers = guildOptions.stickers; // TODO: STICKER OBJECT
        this.premium_progress_bar_enabled = guildOptions.premium_progress_bar_enabled;
        this.safety_alerts_channel_id = guildOptions.safety_alerts_channel_id; // TODO: SNOWFLAKE

        // Channel conversion to class
        guildOptions.channels.forEach((channel) => {
            // TODO: Detect if it's a DM/Voice/Guild channel
            // And typing....
            this.channels.set(channel.id, new GuildChannel(channel))
        })
        // Guild map
        Object.getOwnPropertyNames(this).forEach((propertyName) => {
            if(this[propertyName]){
                this.set(propertyName, this[propertyName])
            }
        })
    }

    /** 
     * Get Guild decoration URLS
     * @params type
     * @returns URL
     */
    getDecorationUrl(type: "banner"|"icon"|"splash"|"discoverySplash", fileExtension: "jpg"|"png"|"gif"): URL | void  {
        switch(type){
            case "banner":
                if(this.banner === null)throw new Error("This guild has no banner!")
                return `${ImageUrl}/banners/${this.id}/${this.banner}.${fileExtension}`
            break;
            case "icon":
                if(this.icon === null)throw new Error("This guild has no icon!")
                return `${ImageUrl}/icons/${this.id}/${this.icon}.${fileExtension}`
            break;
            case "splash":
                if(this.splash === null)throw new Error("This guild has no splash!")
                return `${ImageUrl}/splashes/${this.id}/${this.splash}.${fileExtension}`
            break;
            case "discoverySplash":
                if(this.splash === null)throw new Error("This guild has no discovery splash!")
                return `${ImageUrl}/discovery-splashes/${this.id}/${this.discovery_splash}.${fileExtension}`
            break;
            default:
                throw new Error(`Incorrect option! Got ${type}, expected: banner, icon, splash or discoverySplash`)
        }
    }
}