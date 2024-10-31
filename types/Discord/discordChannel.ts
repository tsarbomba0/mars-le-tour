import { Emoji } from "../Media/Emoji";

/**
 * Type for a discord channel only used in receiving the response from the Discord API.
 */
export type discordChannel = { 
    version: number,
    type: number,
    topic: string|null,
    rate_limit_per_user: number,
    position: number,
    permission_overwrites: Array<object>,
    parent_id: string,
    name: string,
    last_message_id: string,
    id: string,
    icon_emoji: Emoji
    flags: number
    rtc_region: string|null;
    bitrate: number;
    user_limit: number;
}