import { apiUrls } from "../enums/ApiURLs"
import { DiscordAPIResponse } from "../types/Discord/discordAPIResponse"
import { headerObject } from "./Objects/header"


/**
* Sends a POST to the Guild portion of the Discord HTTP API.
* @param {object|null} data Object containing data for the callback. (can be set to null.)
* @param {string} id ID of the Guild.
* @param {string} endpoint Endpoint used.
* @returns {Promise<DiscordAPIResponse>}
*/
async function post(data: Object | null, id: string, endpoint: string): Promise<DiscordAPIResponse>{
    let response = await fetch(`${apiUrls.regularURI}/${id}/${endpoint}`, {
        method: 'POST',
        headers: headerObject,
        body: JSON.stringify({
            data: data
        })
    })
    return (await response.json() as DiscordAPIResponse)
}


export const Guilds = {
    /**
    * Sends a POST to the Guild portion of the Discord HTTP API.
    * @param {object|null} data Object containing data for the callback. (can be set to null.)
    * @param {string} id ID of the Guild.
    * @param {string} endpoint Endpoint used.
    * @returns {Promise<DiscordAPIResponse>}
    */
    post
}