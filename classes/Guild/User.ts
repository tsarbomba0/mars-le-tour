
/**
 * Class for a Discord User
 */
export class User {
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
}