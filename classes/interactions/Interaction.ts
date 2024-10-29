import { InteractionOptions } from "../../types/Options/InteractionOptions";
import { GuildMember } from "../Guild/GuildMember";
import { Guild } from "../Guild/Guild";
import { User } from "../Guild/User";
import { DiscordClient } from "../DiscordClient";
import { ModalOptions } from "../../types/Options/ModalOptions";
import { deleteReply, editReply, followupSend, ping, restReply } from "../../rest/InteractionResponse";
import { interactionCallback } from "../../enums/InteractionCallback";

/**
 * Class for the Discord Interaction object.
 */
export class Interaction {
    // Properties
    readonly token: string; // Token
    id: string; // ID of the interaction
    name: string; // Name of executed Interaction
    options: Map<string, Object> ; // Option map
    guild?: Guild // Guild object
    guild_id: string; // Guild id (if executed in a guild)
    channel?: object; // channel obj
    channel_id?: string; // Channel id (if executed in a guild)
    member?: GuildMember | null; // Present if command executed in a guild
    user?: User | null// Present if command executed in dms
    app_permissions: string; // Permissions
    locale?: string; // Locale
    guild_locale: string; // Guild Locale
    entitlements: Array<object> //entitlement objects
    client: DiscordClient

    constructor(options: InteractionOptions, client: DiscordClient){
        this.id = options.id
        this.token = options.token
        this.name = options.data ? options.data.name : "PLACEHOLDERNAME"
        this.user = options.user
        this.guild = options.guild
        this.guild_id = options.guild_id
        this.channel = options.channel
        this.channel_id = options.channel_id
        this.member = options.member
        this.locale = options.locale
        this.guild_locale = options.guild_locale
        this.entitlements = options.entitlements
        this.client = client
        // Option map
        this.options = new Map()
        options.data?.options.forEach((option) => {
            let values: Object = {
                value: option.value
            }
            if(option.options)values['options'] = option.options
            this.options.set(option.name, values)
        })
    }

    readonly headerObject = {
        'User-Agent': 'DiscordBot (mars-le-tour, 1.0.0)',
        'Content-Type': 'application/json',
    }
    
    // URIs
    readonly interactionURI = `https://discord.com/api/v10/interactions`
    readonly webhookURI = `https://discord.com/api/v10/webhooks`

    
    /**
     * Replies to the Interaction.
     * @param content 
     */
    async reply(content: Object){ 
        console.log(content)
        const fetchResponse = await fetch(`${this.interactionURI}/${this.id}/${this.token}/callback`, {
            method: 'POST',
            headers: this.headerObject,
            body: JSON.stringify({
                type: 4,
                data: content
            })
            },
        )

        if((await fetchResponse).ok !== true){
            let respJson = await fetchResponse.json()
            console.log(respJson.errors.data.components[0]._errors)
            throw new Error(respJson.message)
        }
    }
    
    /**
     * Defers the response for the Interaction.
     */
    async defer(){
        const fetchResponse = await fetch(`${this.interactionURI}/${this.id}/${this.token}/callback`, {
            method: 'POST',
            headers: this.headerObject,
            body: JSON.stringify({
                type: 5,
                data: null
            })
            ,
        })
        if((await fetchResponse).ok !== true){
            let respJson = await fetchResponse.json()
            console.log(respJson.errors)
            throw new Error(respJson.message)
        }
    }

    /**
     * Edits the original response for the Interaction
     * @param content 
     */
    async editResponse(content: Object){
        const fetchResponse = await editReply(content, this)
        if((await fetchResponse).ok !== true){
            throw new Error(fetchResponse.message)
        }
    }

    /**
     * Sends a followup message for the Interaction.
     * @param content 
     * @returns void
     */
    async send(content: Object){
        const fetchResponse = await followupSend(content, this)
        if((await fetchResponse).ok !== true){
            throw new Error(fetchResponse.message)
        }
    }

    /**
     * Sends a ACK ping as the reply
     */
    async ping(){
        const fetchResponse = await ping(this)
        if((await fetchResponse).ok !== true){
            throw new Error(fetchResponse.message)
        }
        
    }

    /**
     * Deletes the original message
     * @returns void
     */
    async delete(){
        const fetchResponse = await deleteReply(this)
        if((await fetchResponse).ok !== true){
            throw new Error(fetchResponse.message)
        }
    }
    /**
     * Replies with a Modal object.
     * @param content
     * @returns void
     */
    async replyModal(content: ModalOptions){
        const fetchResponse = await restReply(content, this, interactionCallback.modal)
        if((await fetchResponse).ok !== true){
            throw new Error(await fetchResponse.message)
        }
    }
}