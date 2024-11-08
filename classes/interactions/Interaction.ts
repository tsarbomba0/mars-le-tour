import { InteractionOptions } from "../../types/Options/InteractionOptions";
import { GuildMember } from "../Guild/GuildMember";
import { Guild } from "../Guild/Guild";
import { User } from "../Guild/User";
import { DiscordClient } from "../DiscordClient";
import { ModalOptions } from "../../types/Options/ModalOptions";
import { REST } from "../../rest/REST";
import { interactionCallback } from "../../enums/InteractionCallback";
import { error } from "console";

/**
 * Class for the Discord Interaction object.
 */
export class Interaction {
    /** the Interaction's Token */ 
    readonly token: string; 
    /** the Interaction's ID */
    readonly id: string; // ID of the interaction.
    /** the Interaction's Name (If not present, replaced with PLACEHOLDERNAME). */
    readonly name: string; 
    /** Map object for the Interaction's options. */
    readonly options: Map<string, Object> ; 
    /** The guild that the interaction was invoked in. */
    readonly guild?: Guild 
    /** ID of the Guild where the interaction was invoked. */
    readonly guildId: string; 
    /** Channel where the interaction was invoked. */
    readonly channel?: object; 
    /** ID of the channel where the interaction was invoked. */
    readonly channelId?: string; 
    /** GuildMember that invoked the interaction. */
    readonly member?: GuildMember | null; 
    /** the User that invoked the interaction. */
    readonly user?: User | null
    /** Permissions for applications. */
    readonly appPermissions: string; 
    /** The locale for the Interaction. */
    locale?: string; 
    /** Locale of the guild where the interaction was used. */
    guildLocale: string; 
    /** Entitlements. */
    entitlements: Array<object> 
    /** Discord Client handling the interaction. */
    client: DiscordClient

    constructor(options: InteractionOptions, client: DiscordClient){
        // Properties
        this.id = options.id
        this.token = options.token
        this.name = options.data ? options.data.name : "PLACEHOLDERNAME"
        this.user = options.user
        this.guild = options.guild
        this.guildId = options.guild_id
        this.channel = options.channel
        this.channelId = options.channel_id
        this.member = options.member
        this.locale = options.locale
        this.guildLocale = options.guild_locale
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


    /**
     * Replies to the Interaction.
     * @param content Content of the request
     * @returns Promise<void>
     */
    async reply(content: Object): Promise<void>{ 
        console.log(content)
        let response = await REST.Interaction.post(interactionCallback.channelMessageWithSource, content, this.id, this.token, "callback")
        if((await response).ok !== true){
            throw new Error(response.message)
        }
    }
    
    /**
     * Defers the response for the Interaction.
     * @returns Promise<void>
     */
    async defer(): Promise<void> {
        let response = await REST.Interaction.post(interactionCallback.deferredChannelMessage, null, this.id, this.token, "callback")
        if ((await response).ok !== true)throw new Error(response.message)
    }

    /**
     * Edits the original response for the Interaction
     * @param body Body for the request.
     * @returns Promise<void>
     */
    async editResponse(body: Object): Promise<void>{
        let response = await REST.Webhook.patch(body, this.id, `${this.token}/messages/@original`)
        if((await response).ok !== true)throw new Error(response.message)
    }

    /**
     * Sends a followup message for the Interaction.
     * @param content Content of the request
     * @returnsPromise<void>
     */
    async send(content: Object){
        let response = await REST.Webhook.post({
            type: interactionCallback.channelMessageWithSource,
            data: content
        }, this.id, `${this.token}/messages/@original`)
        if((await response).ok !== true)throw new Error(response.message)
    }

    /**
     * Sends a ACK ping as the reply
     * @returns Promise<void>
     */
    async ping(): Promise<void> {
        let response = await REST.Interaction.ping(this.id, this.token)
        if((await response).ok !== true)throw new Error(response.message)
        
    }

    /**
     * Deletes the original message
     * @returns Promise<void>
     */
    async delete(){
        let response = await REST.Webhook.delete(this.id, `${this.token}/messages/@original`)
        if((await response).ok !== true)throw new Error(response.message)
    }
    /**
     * Replies with a Modal object.
     * @param content
     * @returns Promise<void>
     */
    async replyModal(content: ModalOptions): Promise<void>{
        let response = await REST.Interaction.post(interactionCallback.modal, content, this.id, this.token, 'callback')
        if((await response).ok !== true)throw new Error(await response.message)
    }
}