import { Role } from "./Role";
import { User } from "./User";

/**
 * Class for a Guild Member
 */
export class GuildMember {
    user: User
    nick?: string;
    avatar?: string;
    banner?: string | null;
    roles: Array<Role>
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