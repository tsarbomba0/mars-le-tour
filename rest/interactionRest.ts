import { apiUrls } from "../enums/ApiURLs"
import { headerObject } from "./Objects/header"
import { DiscordAPIResponse } from "../types/Discord/discordAPIResponse"
import { interactionCallback } from "../enums/InteractionCallback"

/**
* Sends a Ping to the Interaction API
* Special case of a POST.
* @params {string} id ID of the Interaction
* @params {string} token Token of the Interaction
* @returns {Promise<DiscordAPIResponse>}
*/
async function ping(id: string, token: string): Promise <DiscordAPIResponse> {
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
* @param {interactionCallback} type Type of the call, from the InteractionCallback enum.
* @param {object|null} data Object containing data for the callback. (can be set to null.)
* @param {string} id ID of the Interaction.
* @param {string} token Token of the interaction.
* @param {string} endpoint Endpoint used.
* @returns {Promise<DiscordAPIResponse>}
*/
async function post(type: interactionCallback, data: Object | null, id: string, token: string, endpoint: string): Promise<DiscordAPIResponse>{
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

/**
 * Object containing methods relating to the interaction section of the Discord API.
 */
export const Interactions = {
    /**
     * Sends a Ping to the Interaction API
     * Special case of a POST.
     * @param {string} id ID of the Interaction
     * @param {string} token Token of the Interaction
     * @returns {Promise<DiscordAPIResponse>}
     */
    ping,
    /**
     * Sends a POST to the Interaction API.
     * @param {interactionCallback} type Type of the call, from the InteractionCallback enum.
     * @param {object|null} data Object containing data for the callback. (can be set to null.)
     * @param {string} id ID of the Interaction.
     * @param {string} token Token of the interaction.
     * @param {string}endpoint Endpoint used.
     * @returns {Promise<DiscordAPIResponse>}
     */
    post
}