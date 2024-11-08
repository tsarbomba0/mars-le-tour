import { discordGuildOptions } from "../../types/Discord/discordGuildOptions";
import { URL } from "../../types/Media/URL";
import { CategoryChannel } from "../CategoryChannel";
import { DMChannel, GuildChannel, VoiceChannel } from "../Channel";
import { GuildMember } from "./GuildMember";
import { Role } from "./Role";
const ImageUrl = "https://cdn.discordapp.com"
let botToken;
/**
 * Class for a Discord Guild
 */
export class Guild extends Map {
    // Basic properties left for easier usage
    id: string;
    name: string|null;
    icon: string|null;

    // Attached maps
    channels: Map<string, DMChannel|VoiceChannel|GuildChannel> 
    members: Map<string, GuildMember>
    categories: Map<string, CategoryChannel>
    presences: Map<string, object>
    roles: Map<string, Role>

    constructor(guildOptions: discordGuildOptions, token: string){
        super()
        // Basic properties
        this.id = guildOptions.id
        this.name = guildOptions.name
        this.icon = guildOptions.icon
        this.set('id', guildOptions.id);
        this.set('memberCount', guildOptions.member_count);
        
        this.set('threads', guildOptions.threads); // ^
        this.set('stageInstances', guildOptions.stage_instances); // TODO: STAGE INSTANCE OBJECT
        this.set('guildScheduledSvents', guildOptions.guild_scheduled_events); // TODO: SCHEDULED EVENT OBJECT
        this.set('soundboardSounds', guildOptions.soundboard_sounds); // TODO: SOUNDBOARD SOUND OBJECT
        this.set('name', guildOptions.name);
        this.set('icon', guildOptions.icon);
        this.set('splash', guildOptions.splash);
        this.set('discoverySplash', guildOptions.discovery_splash);
        this.set('ownerId', guildOptions.owner_id); 
        this.set('region', guildOptions.region);
        this.set('afkChannelId', guildOptions.afk_channel_id); 
        this.set('afkTimeout', guildOptions.afk_timeout);
        this.set('widgetEnabled', guildOptions.widget_enabled);
        this.set('widgetChannelId', guildOptions.widget_channel_id); 
        this.set('verificationLevel', guildOptions.verification_level);
        this.set('defaultMessageNotification', guildOptions.default_message_notification);
        this.set('explicitContentFilter', guildOptions.explicit_content_filter);
        this.set('emojis', guildOptions.emojis); // TODO: EMOJI OBJECT
        this.set('features', guildOptions.features); // TODO: GUILD FEATURE STRINGS
        this.set('mfaLevel', guildOptions.mfa_level);
        this.set('applicationId', guildOptions.application_id); 
        this.set('systemChannelId', guildOptions.system_channel_id); 
        this.set('systemChannelFlags', guildOptions.system_channel_flags); 
        this.set('rulesChannelId', guildOptions.rules_channel_id); 
        this.set('maxMembers', guildOptions.max_members);
        this.set('description', guildOptions.description);
        this.set('banner', guildOptions.banner);
        this.set('premiumTier', guildOptions.premium_tier);
        this.set('premium_subscription_count', guildOptions.premium_subscription_count);
        this.set('preferredLocale', guildOptions.preferred_locale);
        this.set('publicUpdatesChannelId', guildOptions.public_updates_channel_id); // TODO: SNOWFLAKE
        this.set('maxVideoChannelUsers', guildOptions.max_video_channel_users);
        this.set('maxStageVideoChannelUsers', guildOptions.max_stage_video_channel_users);
        this.set('approximatePresenceCount', guildOptions.approximate_presence_count);
        this.set('welcomeScreen', guildOptions.welcome_screen); // TODO: WELCOME SCREEN OBJECT
        this.set('nsfwLevel', guildOptions.nsfw_level);
        this.set('stickers', guildOptions.stickers); // TODO: STICKER OBJECT
        this.set('safetyAlertsChannelId', guildOptions.safety_alerts_channel_id); // TODO: SNOWFLAKE

        botToken = token

        // Maps as properties of the class
        this.roles = new Map()
        this.presences = new Map() // TODO: PARTIAL AND FULL PRESENCE OBJECTS
        this.channels = new Map<string, DMChannel|VoiceChannel|GuildChannel>
        this.categories = new Map()

        // Channel conversion to class
        guildOptions.channels.forEach((channel) => {
            // TODO: Detect if it's a DM/Voice/Guild channel
            // And typing....
            switch(channel.type){
                case 4: 
                    this.categories.set(channel.id, new CategoryChannel(channel))
                break;
                case 0: 
                    this.channels.set(channel.id, new GuildChannel(channel, botToken))
                break;
            }
        })

        // Attach child channels to their category channels
        this.categories.forEach((category) => {
            this.channels.forEach((channel) => {
                if(category.get("id") === channel.get("parentId")){
                    category.addChild(channel)
                }
            })
        })

        // Presence map
        guildOptions.presences.forEach((presence) => {
            this.presences.set(presence.id, presence)
        })

        // Role map
        guildOptions.roles.forEach((role) => {
            this.roles.set(role.id, role)
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
                if(this.get("banner") === null)throw new Error("This guild has no banner!")
                return `${ImageUrl}/banners/${this.id}/${this.get("banner")}.${fileExtension}`
            break;
            case "icon":
                if(this.icon === null)throw new Error("This guild has no icon!")
                return `${ImageUrl}/icons/${this.id}/${this.icon}.${fileExtension}`
            break;
            case "splash":
                if(this.get("splash") === null)throw new Error("This guild has no splash!")
                return `${ImageUrl}/splashes/${this.id}/${this.get("splash")}.${fileExtension}`
            break;
            case "discoverySplash":
                if(this.get("discoverySplash") === null)throw new Error("This guild has no discovery splash!")
                return `${ImageUrl}/discovery-splashes/${this.id}/${this.get("discoverySplash")}.${fileExtension}`
            break;
            default:
                throw new Error(`Incorrect option! Got ${type}, expected: banner, icon, splash or discoverySplash`)
            break;
        }
    }
}