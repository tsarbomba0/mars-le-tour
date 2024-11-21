
import { discordGuildOptions } from "./discordGuildOptions";
import { User } from "../../classes/Guild/User";


/**
 * Type describing the d (data) field from the discordPayload type.
 */
export interface discordPayloadData {
    user: User; 
    session_id: string;
    resume_gateway_url: string;
    guilds: Array<discordGuildOptions>;
    id: string;
    heartbeat_interval: number
}

/**
 * Type describing a payload from the Discord gateway.
 */
export interface discordPayload extends Object {
    s: number | null,
    op: number | null,
    t: string | null,
    d: discordPayloadData | null,
}

