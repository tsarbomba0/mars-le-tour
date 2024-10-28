import { InteractionOptions } from "../../types/Options/InteractionOptions";
import { GuildMember } from "../../types/Guild/GuildMember";
import { Guild } from "../../types/Guild/Guild";
import { User } from "../../types/Guild/User";
import { DiscordClient } from "../DiscordClient";
export class Interaction{
    // Properties
    private token: string; // Token
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

    private headerObject = {
        'User-Agent': 'DiscordBot (mars-le-tour, 1.0.0)',
        'Content-Type': 'application/json',
    }
    
    // URIs
    private interactionURI = `https://discord.com/api/v10/interactions`
    private webhookURI = `https://discord.com/api/v10/webhooks`

    
    /*
    Replies to the interaction!
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
    
    /*
    Defers the response to the interaction, let's you respond after a longer time than 3 seconds.
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

    /*
    Edits the original response to the interaction.
    */
    async editResponse(content: Object){
        const fetchResponse = await fetch(`${this.webhookURI}/${this.client.user.id}/${this.token}/messages/@original`, {
            method: 'PATCH',
            headers: this.headerObject,
            body: JSON.stringify(content)
        })
        if((await fetchResponse).ok !== true){
            let respJson = await fetchResponse.json()
            console.log(respJson.errors)
            throw new Error(respJson.message)
        }
    }

    /*
    Sends a followup message.
    */
    async send(content: Object){
        const fetchResponse = await fetch(`${this.webhookURI}/${this.client.user.id}/${this.token}/messages/@original`, {
            method: 'POST',
            headers: this.headerObject,
            body: JSON.stringify({
                type: 4,
                data: content
            })
        })
        if((await fetchResponse).ok !== true){
            let respJson = await fetchResponse.json()
            throw new Error(respJson.message)
        }
    }

    /*  
    ACK ping.
    */
    async ping(){
        const fetchResponse = await fetch(`${this.interactionURI}/${this.id}/${this.token}`, {
            method: 'POST',
            headers: this.headerObject,
            body: JSON.stringify({
                type: 1,
                data: null
            })
            },
        )
        if((await fetchResponse).ok !== true){
            let respJson = await fetchResponse.json()
            console.log(respJson.errors)
            throw new Error(respJson.message)
        }
        
    }

    /*
    Deletes the original message.
    */
    async delete(){
        const fetchResponse = await fetch(`${this.webhookURI}/${this.client.user.id}/${this.token}/messages/@original`, {
            method: 'DELETE',
            headers: this.headerObject,
            body: JSON.stringify({
                type: 1,
                data: null
            })
            },
        )
        if((await fetchResponse).ok !== true){
            let respJson = await fetchResponse.json()
            console.log(respJson.errors)
            throw new Error(respJson.message)
        }
    }
    /**
     * Replies with a Modal object.
     * 
     * 
     */
    async replyModal(content: Object){
        const fetchResponse = await fetch(`${this.interactionURI}/${this.id}/${this.token}/callback`, {
            method: 'POST',
            headers: this.headerObject,
            body: JSON.stringify({
                type: 9,
                data: content
            })
        })
        if((await fetchResponse).ok !== true){
            let respJson = await fetchResponse.json()
            console.log(respJson.errors.data.components[0].components[0]._errors)
            throw new Error(JSON.stringify(respJson))
        }

    }

}