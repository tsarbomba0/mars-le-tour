import { RoleTags } from "./RoleTags";

/**
 * Class for a discord role object.
 */
export class Role {
    id: string;
    name: string;
    color: number;
    hoist: boolean;
    icon?: string;
    unicode_emoji: string;
    position: number;
    permissions: string;
    managed: boolean;
    mentionable: boolean;
    tags?: RoleTags
    flags: number;
}