
import { Guild } from "../../classes/Guild/Guild";
import { GuildMember } from "../../classes/Guild/GuildMember";
import { InteractionOptions } from "../Options/InteractionOptions";
import { User } from "../../classes/Guild/User";
import { discordGuildOptions } from "./discordGuildOptions";
import { messageOptions } from "../../classes/Message";

export interface discordPayloadData extends Omit<messageOptions, "application_id"|"flags"|"guild_id">, Omit<User, "banner">, Omit<discordGuildOptions, "application_id"|"channels">, Omit<GuildMember, 'banner'|'avatar'|'avatar_decoration_data'>, Omit<InteractionOptions, 'name'|'channel_id'>, Omit<discordGuildOptions, "application_id"> {
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

