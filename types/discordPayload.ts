
import { User } from "./User";
export interface discordPayloadData extends Object {
    heartbeat_interval: number
    user: User; 
    session_id: string;
    resume_gateway_url: string;
    guilds: Array<object>;
}

export interface discordPayload extends Object {
    s: string | null,
    op: number | null,
    t: string | null,
    d: discordPayloadData | null,
}

