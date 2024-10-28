import { GuildMember } from "./GuildMember";

export interface Guild extends Object {
    id: string; // TODO: SNOWFLAKE
    members: Array<GuildMember>;
    member_count: number;
    presences: Array<Object> // TODO: PARTIAL AND FULL PRESENCE OBJECTS
    channels: Array<Object> // TODO: CHANNEL OBJECT
    threads: Array<Object> // ^
    stage_instances: Array<object> // TODO: STAGE INSTANCE OBJECT
    guild_scheduled_events: Array<object> // TODO: SCHEDULED EVENT OBJECT
    soundboard_sounds: Array<object> // TODO: SOUNDBOARD SOUND OBJECT
    name: string | null;
    icon: string | null;
    icon_hash?: string | null;
    splash: string | null;
    discovery_splash: string | null;
    owner_id: string; // TODO: SNOWFLAKE
    region?: string | null;
    afk_channel_id: string | null; // TODO: SNOWFLAKE
    afk_timeout: number;
    widget_enabled?: boolean;
    widget_channel_id?: string | null; // TODO: SNOWFLAKE
    verification_level: number;
    default_message_notification: number;
    explicit_content_filter: number;
    roles: Array<Object>; // TODO: ROLE OBJECT
    emojis: Array<Object>; // TODO: EMOJI OBJECT
    features: Array<string> // TODO: GUILD FEATURE STRINGS
    mfa_level: number;
    application_id: string | null; // TODO: SNOWFLAKE
    system_channel_id: string | null; // TODO: SNOWFLAKE
    system_channel_flags: number; 
    rules_channel_id: string | null; // TODO: SNOWFLAKE
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
}