import { User } from "./User";

export interface GuildMember extends Object {
    user: User
    nick?: string;
    avatar?: string;
    banner?: string | null;
    roles: Array<Object>
    joined_at: string;
    premium_since?: string;
    deaf: boolean;
    mute: boolean;
    flags: number;
    pending?: boolean;
    permissions: string;
    communication_disabled_until?: string;
    avatar_decoration_data?: Object
}