import { Guild } from "../../classes/Guild/Guild";
import { GuildMember } from "../../classes/Guild/GuildMember";
import { InteractionEventOptions, Options } from "../Options/Options";
import { User } from "../../classes/Guild/User";

export type InteractionOptions = {
    id: string; 
    application_id: string;
    type: number;
    data?: InteractionData ; // TODO: interaction Data
    guild?: Guild
    guild_id: string;
    channel?: object; // channel obj
    channel_id?: string;
    member?: GuildMember;
    name: string;
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

export type InteractionData = {
    type: number
    options: Array<InteractionEventOptions>
    name: string
    id: string
    guild_id: string
}