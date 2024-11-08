/**
 * Enum for the types of the Interaction Callback
 */
export enum interactionCallback {
    pong = 1,
    channelMessageWithSource = 4,
    deferredChannelMessage = 5,
    deferredUpdateMessage = 6,
    updateMessage = 7,
    applicationAutocomplete = 8,
    modal = 9,
    premiumRequired = 10,
    launchActivity = 12
}