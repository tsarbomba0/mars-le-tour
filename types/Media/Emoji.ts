import { User } from "../../classes/Guild/User";

/**
 * Type for a Discord Emoji.
 */
export type Emoji = { 
    id: string|null;
    name?: string|null;
    roles?: Array<string>;
    user?: User;
    require_colons?: boolean;
    managed?: boolean;
    animated?: boolean;
    available?: boolean;
}