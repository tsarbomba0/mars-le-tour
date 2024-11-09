import { apiUrls } from "../enums/ApiURLs"
import { headerObject } from "./Objects/header"
import { DiscordAPIResponse } from "../types/Discord/discordAPIResponse"

/**
 * Function to get a channel by id using Discord's REST api.
 * @param {string} id Channel ID
 * @returns {Promise<DiscordAPIResponse>}
 */
async function getChannel(id: string, token: string): Promise<DiscordAPIResponse>{
    let response = await fetch(`${apiUrls.regularURI}/channels/${id}`, {
        method: 'GET',
        headers: Object.assign(headerObject, {'Authorization': `Bot ${token}`}),
        body: null
    })
    return (await response.json())
}


/**
 * Function to send a POST to the channel endpoint
 * @param {string} id Channel ID.
 * @param {object|string} message Body of the request in JSO N.
 * @param {string} endpoint The endpoint to use.
 * @param {string} token Token of the bot
 * @param {Array<string>} filepath Array of strings representing paths to files to send (OPTIONAL)
 * @returns {Promise<DiscordAPIResponse>}
 */
async function post(id: string, message: object|string, endpoint: string, token: string, contentType?: string): Promise<DiscordAPIResponse>{

    let body: string;
    if(typeof message === "object"){
        body = JSON.stringify(message)
    } else if(typeof message === "string"){
        body = message
    } else {
        throw new Error(`Message parameter is of a unsupported type! (${typeof message})`)
    }
    
    let response = await fetch(`${apiUrls.regularURI}/channels/${id}/${endpoint}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bot ${token}`,
            'Content-Type': contentType ? contentType : 'application/json', // Defaults to application/json!
            "User-Agent": "DiscordBot (mars-le-tour 1.0.0)"
        },
        body: body
    })
    
    return (await response.json() as DiscordAPIResponse)
}
/**
 * Function to send a DELETE to the channel endpoint
 * @param {string} id Channel ID.
 * @param {string} endpoint Endpoint to use.
 * @returns {Promise<DiscordAPIResponse>}
 */
async function HTTPDelete(id: string, endpoint: string, token: string): Promise<DiscordAPIResponse>{
    let response = await fetch(`${apiUrls.regularURI}/channels/${id}`, {
        method: 'DELETE',
        headers: Object.assign(headerObject, {'Authorization': `Bot ${token}`}),
        body: null
    })
    return (await response.json())
}
/**
 * Sends a PUT request to the channel endpoint.
 * @param {string} id Channel ID
 * @returns {Promise<DiscordAPIResponse>}
 */
async function put(id: string, endpoint: string, token: string, body?: object): Promise<DiscordAPIResponse>{
    let response = await fetch(`${apiUrls.regularURI}/channels/${id}/${endpoint}`, {
        method: 'PUT',
        headers: Object.assign(headerObject, {'Authorization': `Bot ${token}`}),
        body: JSON.stringify(body)
    })
    return (await response.json())
}
/**
 * Function to send a PATCH to the REST api (for channels).
 * @param {string} id Channel ID.
 * @param {string} endpoint Endpoint to call.
 * @param {object} body Body of the request.
 * @param {string} token Bot token.
 * @returns {Promise<DiscordAPIResponse>}
 */
async function patch(id: string, endpoint: string, body: Object, token: string): Promise<DiscordAPIResponse>{
    let response = await fetch(`${apiUrls.regularURI}/channels/${id}`, {
        method: 'PATCH',
        headers: Object.assign(headerObject, {'Authorization': `Bot ${token}`}),
        body: JSON.stringify(body)
    })
    return (await response.json())
}

export const Channels = {
    post,
    /**
    * Sends a PUT request to the channel endpoint.
    * @param {string} id Channel ID
    * @returns {Promise<DiscordAPIResponse>}
    */
    put,
    /**
    * Function to send a DELETE to the channel endpoint
    * @param {string} id Channel ID.
    * @param {string} endpoint Endpoint to use.
    * @returns {Promise<DiscordAPIResponse>}
    */
    HTTPDelete,
    /**
    * Function to send a PATCH to the REST api (for channels).
    * @param {string} id Channel ID.
    * @param {string} endpoint Endpoint to call.
    * @param {object} body Body of the request.
    * @param {string} token Bot token.
    * @returns {Promise<DiscordAPIResponse>}
    */
    patch
}