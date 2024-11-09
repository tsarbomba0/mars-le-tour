import { Button } from "../../classes/components/Button";
import { User } from "../../classes/Guild/User";
import { ActivityTypes } from "../../enums/ActivityTypes";

/**
 * Type describing a emoji in a discord Activity.
 */
export type ActivityEmoji = {
    name: string;
    id?: string;
    animated?: boolean;
}

/**
 * Type describing a party in a discord Activity,
 * the size property is an array of two integers.
 * The first index is the current size of the party.
 * The second index is the maximum size of the party.
 */
export type ActivityParty = {
    id?: string;
    size?: [number, number] // Current size, maximum size
}

/**
 * Type depicting the assets of the Activity.
 */
export type ActivityAssets = {
    large_image?: string;
    large_text?: string;
    small_image?: string;
    small_test?: string;
}

/**
 * Type depicting the secrets of the Activity
 */
export type ActivitySecrets = {
    join?: string;
    spectate?: string;
    match?: string;
}


/**
 * Type describing the Client's method to access Discord.
 */
export type ClientStatus = {
    desktop?: string
    mobile?: string
    web?: string
}

/**
 * Type descripting a discord Activity.
 */

export type Activity = {
    type: 0|1|2|3|4|5;
    name?: string;
    url?: string | null;
    created_at?: number;
    timestamps?: {
        start?: number;
        end?: number;
    }; 
    application_id?: string;
    details?: string | null;
    state?: string | null;
    emoji?: ActivityEmoji;
    party?: ActivityParty;
    secrets?: ActivitySecrets;
    instance?: boolean;
    flags?: number // OR'd activity flags
    buttons?: Array<Button>
}

/**
 * Type describing a Presence Update event.
 */
export type discordPresenceUpdate = {
    user: Pick<User, 'id'>
    guild_id: string
    status: "idle"|"dnd"|"online"|"offline"
    activities: Array<Activity>
    client_status: ClientStatus
}