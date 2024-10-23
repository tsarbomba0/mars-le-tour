
import { Guild } from "./Guild";
import { GuildMember } from "./GuildMember";
import { User } from "./User";

export interface discordPayloadData extends Object, Guild, User, Omit<GuildMember, 'banner'|'avatar'|'avatar_decoration_data'> {
    heartbeat_interval: number
    user: User; 
    session_id: string;
    resume_gateway_url: string;
    guilds: Array<Guild>;
    id: string;
}

export interface discordPayload extends Object {
    s: number | null,
    op: number | null,
    t: string | null,
    d: discordPayloadData | null,
}

