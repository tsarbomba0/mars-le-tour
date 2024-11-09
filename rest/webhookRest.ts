import { apiUrls } from "../enums/ApiURLs"
import { headerObject } from "./Objects/header"
import { DiscordAPIResponse } from "../types/Discord/discordAPIResponse"

/**
 * Sends a PATCH to a Discord Webhook
 * @param {string} id ID of the Webhook
 * @param {string} endpoint Endpoint to use (ex. messages/@original)
 * @returns {Promise<DiscordAPIResponse>}
 */
async function patch(body: Object, id: string, endpoint?: string): Promise<DiscordAPIResponse>{
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
async function post(body: Object, id: string, endpoint?: string): Promise<DiscordAPIResponse>{
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
async function HTTPDelete(id: string, endpoint?: string): Promise<DiscordAPIResponse>{
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

export const Webhooks = {
    /**
    * Sends a PATCH to a Discord Webhook
    * @param {string} id ID of the Webhook
    * @param {string} endpoint Endpoint to use (ex. <token>/)
    * @returns {Promise<DiscordAPIResponse>}
    */
    patch,
    /**
    * Sends a POST to a Discord Webhook
    * @param {string} id ID of the Webhook
    * @param {string} endpoint Endpoint to use (ex. <token>)
    * @returns {Promise<DiscordAPIResponse>}
    */
    post,
    /**
    * Sends a DELETE to a Discord Webhook
    * @param {string} id ID of the Webhook
    * @param {string} endpoint Endpoint to use (ex. <token>/messages/@original)
    * @returns {Promise<DiscordAPIResponse>}
    */
    HTTPDelete,
}