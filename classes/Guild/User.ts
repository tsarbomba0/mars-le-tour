

/**
 * Utility type for handling responses with Users from the discord API
 */
export type discordUser = {
    verified: boolean
    username: string
    mfa_enabled: boolean
    id: string
    global_name: string | null
    flags: number
    email: string | null
    discriminator: string | null
    clan: string | null
    bot?: boolean
    avatar: string | null
    avatar_decoration_data: string | null
    banner: string;
}

/**
 * Class for a Discord User
 */
export class User extends Map<string, boolean|number|null|string>{
    verified: boolean
    username: string
    mfa_enabled: boolean
    id: string
    global_name: string | null
    flags: number
    email: string | null
    discriminator: string | null
    clan: string | null
    bot?: boolean
    avatar: string | null
    avatar_decoration_data: string | null
    banner: string;

    constructor(payload: discordUser){
        super()
        payload.verified ? this.set("verified", payload.verified) : false;
        payload.username ? this.set("username", payload.username) : false;
        payload.mfa_enabled ? this.set("mfaEnabled", payload.mfa_enabled) : false;
        payload.id ? this.set("id", payload.id) : false;
        payload.global_name ? this.set("globalName", payload.global_name) : false;
        payload.flags ? this.set("flags", payload.flags) : false;
        payload.email ? this.set("email", payload.email) : false;
        payload.discriminator ? this.set("discriminator", payload.discriminator) : false;
        payload.clan ? this.set("clan", payload.clan) : false;
        payload.bot ? this.set("bot", payload.bot) : false;
        payload.avatar ? this.set("avatar", payload.avatar) : false;
        payload.avatar_decoration_data ? this.set("avatarDecorationData", payload.avatar_decoration_data) : false;
        payload.banner ? this.set("banner", payload.banner) : false;
    }
}