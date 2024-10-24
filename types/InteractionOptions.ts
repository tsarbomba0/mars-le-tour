import { Guild } from "./Guild";
import { GuildMember } from "./GuildMember";
import { User } from "./User";

export type InteractionOptions = {
    id: string; 
    application_id: string;
    type: number;
    data?: Array<object> ; // TODO: interaction Data
    guild?: Guild
    guild_id: string;
    channel?: object; // channel obj
    channel_id?: string;
    member?: GuildMember;
    user?: User
    token: string;
    version: number;
    message?: object; // message obj
    app_permissions: string;
    locale?: string;
    guild_locale: string;
    entitlements: Array<object> //entitlement objects
    //authorizing_integration_owners - MAYBE!
    interaction_context_type: number;
}