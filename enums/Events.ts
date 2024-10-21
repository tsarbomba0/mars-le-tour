export enum Events {
    // ready event
    ready = "READY",

    // Resume event
    resume = "RESUMED",

    // Invalid session event
    invalidSession = "INVALID_SESSION",

    // Message events
    messageCreate = "MESSAGE_CREATE",
    messageDelete = "MESSAGE_DELETE",
    messageDeleteBulk = "MESSAGE_DELETE_BULK",
    messageUpdate = "MESSAGE_UPDATE",

    // Message reaction events
    messageReactionAdd = "MESSAGE_REACTION_ADD",
    messageReactionRemove = "MESSAGE_REACTION_REMOVE",
    messageReactionRemoveAll = "MESSAGE_REACTION_REMOVE_ALL",
    messageReactionRemoveEmoji = "MESSAGE_REACTION_REMOVE_EMOJI",

    // Guild events
    guildCreate = "GUILD_CREATE",
    guildUpdate = "GUILD_UPDATE",
    guildDelete = "GUILD_DELETE",
    
    guildRoleCreate = "GUILD_ROLE_CREATE",
    guildRoleUpdate = "GUILD_ROLE_UPDATE",
    guildRoleDelete = "GUILD_ROLE_DELETE",

    guildMemberAdd = "GUILD_MEMBER_ADD",
    guildMemberUpdate = "GUILD_MEMBER_UPDATE",
    guildMemberRemove = "GUILD_MEMBER_REMOVE",
    
    guildIntegrationUpdate = "GUILD_INTEGRATIONS_UPDATE",

    // Thread events
    threadCreate = "THREAD_CREATE",
    threadUpdate = "THREAD_UPDATE",
    threadDelete = "THREAD_DELETE",

    threadListSync = "THREAD_LIST_SYNC",
    threadMemberUpdate = "THREAD_MEMBER_UPDATE",
    threadMembersUpdate = "THREAD_MEMBERS_UPDATE",

    // Stage events
    stageInstanceCreate = "STAGE_INSTANCE_CREATE",
    stageInstanceUpdate = "STAGE_INSTANCE_UPDATE",
    stageInstanceDelete = "STAGE_INSTANCE_DELETE",

    // Interaction event
    interactionCreate = "INTERCTION_CREATE",

    // Typing event
    typingStart = "TYPING_START",

    // Poll events
    messagePollVoteAdd = "MESSAGE_POLL_VOTE_ADD",
    messagePollVoteRemove = "MESSAGE_POLL_VOTE_REMOVE",

    // TODO: 
    /*
    - Auto moderation events
    - some niche events
    - presences
    - reactions
    - webhooks
    - invites
    */
}