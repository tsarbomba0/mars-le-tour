import { apiUrls } from "../enums/ApiURLs"
import { interactionCallback } from "../enums/InteractionCallback"
import { DiscordAPIResponse } from "../types/Discord/discordAPIResponse"
import { headerObject } from "./Objects/header"

/**
 * Function to get a channel by id using Discord's REST api.
 * @param id Channel ID
 * @returns Object
 */
async function getChannel(id: string): Promise<DiscordAPIResponse>{
    let response = await fetch(`${apiUrls.regularURI}/channels/${id}`, {
        method: 'GET',
        headers: headerObject,
        body: null
    })
    return (await response.json())
}
/**
 * Function to send a GET to the channel endpoint
 * @param id Channel ID.
 * @param body Body of the request in JSON.
 * @param endpoint The endpoint to use.
 * @returns Object
 */
async function postChannel(id: string, body: object, endpoint: string, token: string): Promise<DiscordAPIResponse>{
    let response = await fetch(`${apiUrls.regularURI}/channels/${id}/${endpoint}`, {
        method: 'POST',
        headers: Object.assign(headerObject, {'Authorization': `Bot ${token}`}),
        body: JSON.stringify(body)
    })
    return (await response.json())
}
/**
 * Function to send a DELETE to the channel endpoint
 * @param id Channel ID.
 * @param endpoint Endpoint to use.
 * @returns Object
 */
async function deleteChannel(id: string, endpoint: string): Promise<DiscordAPIResponse>{
    let response = await fetch(`${apiUrls.regularURI}/channels/${id}`, {
        method: 'DELETE',
        headers: headerObject,
        body: null
    })
    return (await response.json())
}
/**
 * Function to get a channel by id using Discord's REST api.
 * @param id Channel ID
 * @returns Object
 */
async function putChannel(id: string): Promise<DiscordAPIResponse>{
    let response = await fetch(`${apiUrls.regularURI}/channels/${id}`, {
        method: 'DELETE',
        headers: headerObject,
        body: null
    })
    return (await response.json())
}
const Channels = {
    post: postChannel,
    put: putChannel,
    delete: deleteChannel
}


/**
 * Sends a PATCH to a Discord Webhook
 * @param id ID of the Webhook
 * @param endpoint Endpoint to use (ex. messages/@original)
 * @returns Promise<DiscordAPIResponse>
 */
async function patchWebhook(body: Object, id: string, endpoint?: string): Promise<DiscordAPIResponse>{
    let response = await fetch(`${apiUrls.webhookURI}/${id}/${endpoint}`, {
        method: 'PATCH',
        headers: headerObject,
        body: JSON.stringify(body)
    })
    return (await response.json())
}
/**
 * Sends a POST to a Discord Webhook
 * @param id ID of the Webhook
 * @param endpoint Endpoint to use (ex. messages/@original)
 * @returns Promise<DiscordAPIResponse>
 */
async function postWebhook(body: Object, id: string, endpoint?: string): Promise<DiscordAPIResponse>{
    let response = await fetch(`${apiUrls.webhookURI}/${id}/${endpoint}`, {
        method: 'POST',
        headers: headerObject,
        body: JSON.stringify(body)
    })
    return (await response.json())
}

/**
 * Sends a DELETE to a Discord Webhook
 * @param id ID of the Webhook
 * @param endpoint Endpoint to use (ex. messages/@original)
 * @returns Promise<DiscordAPIResponse>
 */
async function deleteWebhook(id: string, endpoint?: string): Promise<DiscordAPIResponse>{
    let response = await fetch(`${apiUrls.webhookURI}/${id}/${endpoint}`, {
        method: 'DELETE',
        headers: headerObject,
        body: JSON.stringify({
            type: 0,
            data: null
        })
        },
    )
    return (await response.json())
}

const webhookAPI = {
    /**
    * Sends a PATCH to a Discord Webhook
    * @param id ID of the Webhook
    * @param endpoint Endpoint to use (ex. <token>/)
    * @returns Promise<DiscordAPIResponse>
    */
    patch: patchWebhook,
    /**
    * Sends a POST to a Discord Webhook
    * @param id ID of the Webhook
    * @param endpoint Endpoint to use (ex. <token>)
    * @returns Promise<DiscordAPIResponse>
    */
    post: postWebhook,
    /**
    * Sends a DELETE to a Discord Webhook
    * @param id ID of the Webhook
    * @param endpoint Endpoint to use (ex. <token>/messages/@original)
    * @returns Promise<DiscordAPIResponse>
    */
    delete: deleteWebhook,
}

/**
* Sends a Ping to the Interaction API
* Special case of a POST.
* @params id ID of the Interaction
* @params token Token of the Interaction
* @returns Promise<DiscordAPIResponse>
*/
async function pingInteraction(id: string, token: string): Promise <DiscordAPIResponse> {
    let response = await fetch(`${apiUrls.interactionURI}/${id}/${token}`, {
        method: 'POST',
        headers: headerObject,
        body: JSON.stringify({
            type: interactionCallback.pong,
            data: null
        })
    },
    )
    return (await response.json())
}

/**
* Sends a POST to the Interaction API.
* @params type Type of the call, from the InteractionCallback enum.
* @params data Object containing data for the callback. (can be set to null.)
* @params id ID of the Interaction.
* @params token Token of the interaction.
* @params endpoint Endpoint used.
* @returns Promise<DiscordAPIResponse>
*/
async function postInteraction(type: interactionCallback, data: Object | null, id: string, token: string, endpoint: string): Promise<DiscordAPIResponse>{
    let response = await fetch(`${apiUrls.interactionURI}/${id}/${token}/${endpoint}`, {
        method: 'POST',
        headers: headerObject,
        body: JSON.stringify({
            type: type,
            data: data
        })
    })
    return (await response.json() as DiscordAPIResponse)
}


const interactionAPI = {
    /**
     * Sends a Ping to the Interaction API
     * Special case of a POST.
     * @params id ID of the Interaction
     * @params token Token of the Interaction
     * @returns Promise<DiscordAPIResponse>
     */
    ping: pingInteraction,
    /**
     * Sends a POST to the Interaction API.
     * @params type Type of the call, from the InteractionCallback enum.
     * @params data Object containing data for the callback. (can be set to null.)
     * @params id ID of the Interaction.
     * @params token Token of the interaction.
     * @params endpoint Endpoint used.
     * @returns Promise<DiscordAPIResponse>
     */
    post: postInteraction
}



/**
 * Main body of the REST api wrapper.
 */
export const REST = {
    /**
    * Object containing the methods relating to the Interaction API.
    */
    Interaction: interactionAPI,
    /**
    * Object containing methods related to the Webhook API.
    */
    Webhook: webhookAPI,
    /**
     * Object containing methods related to the Channel Endpoint
     */
    Channels: Channels,
}




