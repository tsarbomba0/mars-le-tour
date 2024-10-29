/**
 * Contexts of the Interaction.
 */
export enum InteractionContext {
    guild = 0, /// Guild 
    botDM = 1, /// in Bot DMs
    privateChannel = 2, /// in some other private channel except bot's DMs
}