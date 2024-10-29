
import { Guild } from "../../classes/Guild/Guild";
import { GuildMember } from "../../classes/Guild/GuildMember";
import { InteractionOptions } from "../Options/InteractionOptions";
import { User } from "../../classes/Guild/User";

export interface discordPayloadData extends Object, Omit<Guild, 'application_id'>, User, Omit<GuildMember, 'banner'|'avatar'|'avatar_decoration_data'>, Omit<InteractionOptions, 'name'> {
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

