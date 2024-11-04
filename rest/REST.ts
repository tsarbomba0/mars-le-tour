import { Message, messageOptions } from "../classes/Message"
import { apiUrls } from "../enums/ApiURLs"
import { ContentTypes } from "../enums/ContentTypes.ts"
import { interactionCallback } from "../enums/InteractionCallback"
import { DiscordAPIResponse } from "../types/Discord/discordAPIResponse"
import { MessageRequest } from "../types/Discord/discordMessageOptions"
import { MultiPartRequest } from "../util/multipartRequest"
import { headerObject } from "./Objects/header"


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
 * @param {MessageRequest} message Body of the request in JSON.
 * @param {string} endpoint The endpoint to use.
 * @param {string} token Token of the bot
 * @param {Array<string>} filepath Array of strings representing paths to files to send (OPTIONAL)
 * @returns {Promise<DiscordAPIResponse>}
 */
async function postChannel(id: string, message: MessageRequest, endpoint: string, token: string, filepath?: Array<string>): Promise<DiscordAPIResponse>{
    let messageBody: string = "";
    let contentType: string = "application/json";

    // If the message contains attachments, attempt to make a multipart request
    if(filepath){
        // Throw an error if files aren't present
        
        // Multi-part request
        let request = new MultiPartRequest()
        .contentOptions({
            contentDisposition: "name=\"payload_json\"",
            contentType: "application/json"
        })
        .insertJSONData(message)
        
        // Iterating over array to attach each file to the request
        filepath.forEach((file) => {
            request.insertBoundary() //
            let match = file.match(/([^\\]*$)/)

            if(match !== null){
                let filename = match[0]
                request.contentOptions({
                    contentDisposition: `name=\"files[${filepath.indexOf(file)}]\"; filename=\"${filename}\"`,
                    contentType: ContentTypes[filename.match(/([^\.]*$)/)![0]],
                    contentTransferEncoding: 'base64'
                })
                request.insertBase64(file)
            } else {
                throw new Error(`Couldn't find such a file: ${file}!`)
            }
        })
        request.endBoundary()
        
        // Setting Content-Type header
        contentType = `multipart/form-data; boundary=${request.boundary}`
        // Changing the Message body to the request
        messageBody = request.finalize()

    } else {
        // JSON Object => string
        messageBody = JSON.stringify(message)
    }

    let response = await fetch(`${apiUrls.regularURI}/channels/${id}/${endpoint}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bot ${token}`,
            'Content-Type': contentType,
            "User-Agent": "DiscordBot (mars-le-tour 1.0.0)"
        },
        body: messageBody
    })
    return (await response.json())
}
/**
 * Function to send a DELETE to the channel endpoint
 * @param {string} id Channel ID.
 * @param {string} endpoint Endpoint to use.
 * @returns {Promise<DiscordAPIResponse>}
 */
async function deleteChannel(id: string, endpoint: string, token: string): Promise<DiscordAPIResponse>{
    let response = await fetch(`${apiUrls.regularURI}/channels/${id}`, {
        method: 'DELETE',
        headers: Object.assign(headerObject, {'Authorization': `Bot ${token}`}),
        body: null
    })
    return (await response.json())
}
/**
 * Function to get a channel by id using Discord's REST api.
 * @param {string} id Channel ID
 * @returns Object
 */
async function putChannel(id: string, endpoint: string, token: string, body?: MessageRequest): Promise<DiscordAPIResponse>{
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
async function patchChannel(id: string, endpoint: string, body: Object, token: string): Promise<DiscordAPIResponse>{
    let response = await fetch(`${apiUrls.regularURI}/channels/${id}`, {
        method: 'PATCH',
        headers: Object.assign(headerObject, {'Authorization': `Bot ${token}`}),
        body: JSON.stringify(body)
    })
    return (await response.json())
}

const Channels = {
    post: postChannel,
    put: putChannel,
    delete: deleteChannel,
    /**
    * Function to send a PATCH to the REST api (for channels).
    * @param {string} id Channel ID.
    * @param {string} endpoint Endpoint to call.
    * @param {object} body Body of the request.
    * @param {string} token Bot token.
    * @returns {Promise<DiscordAPIResponse>}
    */
    patch: patchChannel
}


/**
 * Sends a PATCH to a Discord Webhook
 * @param {string} id ID of the Webhook
 * @param {string} endpoint Endpoint to use (ex. messages/@original)
 * @returns {Promise<DiscordAPIResponse>}
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
 * @param {string} id ID of the Webhook
 * @param {string} endpoint Endpoint to use (ex. messages/@original)
 * @returns {Promise<DiscordAPIResponse>}
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
 * @param {string} id ID of the Webhook
 * @param {string} endpoint Endpoint to use (ex. messages/@original)
 * @returns {Promise<DiscordAPIResponse>}
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
    * @param {string} id ID of the Webhook
    * @param {string} endpoint Endpoint to use (ex. <token>/)
    * @returns {Promise<DiscordAPIResponse>}
    */
    patch: patchWebhook,
    /**
    * Sends a POST to a Discord Webhook
    * @param {string} id ID of the Webhook
    * @param {string} endpoint Endpoint to use (ex. <token>)
    * @returns {Promise<DiscordAPIResponse>}
    */
    post: postWebhook,
    /**
    * Sends a DELETE to a Discord Webhook
    * @param {string} id ID of the Webhook
    * @param {string} endpoint Endpoint to use (ex. <token>/messages/@original)
    * @returns {Promise<DiscordAPIResponse>}
    */
    delete: deleteWebhook,
}

/**
* Sends a Ping to the Interaction API
* Special case of a POST.
* @params {string} id ID of the Interaction
* @params {string} token Token of the Interaction
* @returns {Promise<DiscordAPIResponse>}
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
* @param {interactionCallback} type Type of the call, from the InteractionCallback enum.
* @param {object|null} data Object containing data for the callback. (can be set to null.)
* @param {string} id ID of the Interaction.
* @param {string} token Token of the interaction.
* @param {string} endpoint Endpoint used.
* @returns {Promise<DiscordAPIResponse>}
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
     * @param {string} id ID of the Interaction
     * @param {string} token Token of the Interaction
     * @returns {Promise<DiscordAPIResponse>}
     */
    ping: pingInteraction,
    /**
     * Sends a POST to the Interaction API.
     * @param {interactionCallback} type Type of the call, from the InteractionCallback enum.
     * @param {object|null} data Object containing data for the callback. (can be set to null.)
     * @param {string} id ID of the Interaction.
     * @param {string} token Token of the interaction.
     * @param {string}endpoint Endpoint used.
     * @returns {Promise<DiscordAPIResponse>}
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




