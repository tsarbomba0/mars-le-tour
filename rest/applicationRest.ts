import { headerObject } from "./Objects/header";
import { DiscordAPIResponse } from "../types/Discord/discordAPIResponse";

/**
 * 
 * @param id Application ID.
 * @param {object} data Object with data.
 * @param {string} endpoint Endpoint.
 * @returns 
 */
export async function post(id: string, data: object, endpoint: string, token: string): Promise<DiscordAPIResponse>{
    let response = await fetch(`https://discord.com/api/v10/applications/${id}/${endpoint}`, {
        method: "POST",
        headers: Object.assign(headerObject, {'Authorization': `Bot ${token}`}),
        body: JSON.stringify(data)
    })
    return (await response.json())
}

/**
 * Object containing methods related to the Application API.
 */
export const Applications = {
    /**
    * 
    * @param id Application ID.
    * @param {object} data Object with data.
    * @param {string} endpoint Endpoint.
    * @returns 
    */
    post
}