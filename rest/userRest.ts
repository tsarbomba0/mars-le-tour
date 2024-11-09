import { apiUrls } from "../enums/ApiURLs"
import { headerObject } from "./Objects/header"
import { DiscordAPIResponse } from "../types/Discord/discordAPIResponse"
import { User } from "../classes/Guild/User"
import { userPatchRequest } from "../types/Discord/discordRequestTypes"
import { MultiPartRequest } from "../util/multipartRequest"
import { ContentTypes } from "../enums/ContentTypes"
import { discordChannel } from "../types/Discord/discordChannel"

/**
 * Sends a GET request to the user endpoint.
 * @param id ID of the User.
 * @param token Bot token.
 * @param endpoint Endpoint to use.
 * @returns {Promise<User>}
 */
async function get(id: string, token: string, endpoint: string): Promise<User>{
    let response = await fetch(`${apiUrls.regularURI}/users/${id}/${endpoint}`,
        {
            method: 'GET',
            headers: Object.assign(headerObject, {'Authorization': `Bot ${token}`}),
            body: null
        }
    )
    if (await response.ok === true){
        return response.json()
    } else {
        throw new Error((await response.json() as DiscordAPIResponse).message)
    }
}

/**
 * Sends a PATCH request to user endpoint.
 * @param {userPatchRequest} options Object containing options for the patch request.
 * @param {string} token Bot token.
 * @returns {Promise<User>}
 */
async function patch(options: userPatchRequest, token: string): Promise<User>{
    /*
    MIGHT MOVE THIS OUTSIDE THIS METHOD!
    TODO IG?
    */
    // Multi-part request
    let request = new MultiPartRequest()
    
        
    // If one of them is defined, continue. 
    if(options.avatar !== undefined || options.banner !== undefined){
        ['avatar', 'banner'].forEach((property) => {
            if(property){
                request.insertBoundary() //
                let match = options[property].match(/([^\\]*$)/)

                if(match !== null){
                    let filename = match[0]
                    request.contentOptions({
                        contentDisposition: `name=\"${property}\"; filename=\"${filename}\"`,
                        contentType: ContentTypes[filename.match(/([^\.]*$)/)![0]],
                        contentTransferEncoding: 'base64'
                    })
                    request.insertBase64(options[property])
                } else {
                    throw new Error(`Couldn't find such a file: ${options[property]}!`)
                }
            }
        })
    }

    // If username is defined, add as json data
    if(options.username){
        request.contentOptions({
            contentDisposition: "name=\"payload_json\"",
            contentType: "application/json"
        })
        request.insertJSONData({
            username: options.username
        })
    }

    // End boundary for the request
    request.endBoundary()
        

    let response = await fetch(`${apiUrls.regularURI}/users/@me`,
        {
            method: 'PATCH',
            headers: {
                'User-Agent': 'DiscordBot mars-le-tour 1.0.0',
                'Content-Type': ` multipart/form-data; boundary=${request.boundary}`
            },
            body: request.finalize()
        }
    )
    if (await response.ok === true){
        return response.json()
    } else {
        throw new Error((await response.json() as DiscordAPIResponse).message)
    }
}

/**
 * Sends a POST request to the user endpoint.
 * @param {object} body Body of the request.
 * @param {string} token Bot token.
 * @returns {Promise<discordChannel>}
 */
async function post(body: object, token: string): Promise<discordChannel>{
    let response = await fetch(`${apiUrls.regularURI}/users/@me/channels`,{
        method: 'POST',
        headers: Object.assign(headerObject, {'Authorization': `Bot ${token}`}),
        body: JSON.stringify(body)
    })
    if(response.ok){
        return (await response.json() as discordChannel)
    } else {
        throw new Error(await response.json())
    }
}

/**
 * Object containing methods relating to the user section of the Discord API.
 */
export const Users = {
    /**
    * Sends a PATCH request to user endpoint.
    * @param {userPatchRequest} options Object containing options for the patch request.
    * @param {string} token Bot token.
    * @returns {Promise<User>}
    */
    patch,
    /**
    * Sends a GET request to the user endpoint.
    * @param id ID of the User.
    * @param token Bot token.
    * @param endpoint Endpoint to use.
    * @returns {Promise<User>}
    */
    get,
    /**
    * Sends a POST request to the user endpoint.
    * @param {object} body Body of the request.
    * @param {string} token Bot token.
    * @returns {Promise<discordChannel>}
    */
    post
}