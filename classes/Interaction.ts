import { InteractionOptions } from "../types/InteractionOptions";

export class Interaction{
    // Properties
    id: string;
    token: string;
    interactionURI: string;
    webhookURI: string;

    constructor(options: InteractionOptions){
        this.id = options.id
        this.token = options.token
        this.interactionURI = `https://discord.com/api/v10/interactions/${this.id}/${this.token}`
        this.webhookURI = `https://discord.com/api/v10/webhooks/${this.id}/${this.token}`
    }

    private headerObject = {
        'User-Agent': 'DiscordBot (mars-le-tour, 1.0.0)',
        'Content-Type': 'application/json',
    }
    

    // methods TODO: Test
    /*
    Replies to the interaction!
    */
    reply(content: Object){
        fetch(`${this.interactionURI}/callback`, {
            method: 'POST',
            headers: this.headerObject,
            body: JSON.stringify({
                type: 4,
                data: content
            })
            },
        )
    }
    
    /*
    Defers the response to the interaction, let's you respond after a longer time than 3 seconds.
    */
    defer(){
        fetch(`${this.interactionURI}/callback`, {
            method: 'POST',
            headers: this.headerObject,
            body: JSON.stringify({
                type: 5,
                data: null
            })
            ,
        })
    }
    

    /*
    Edits the original response to the interaction.
    */
    edit(content: Object){
        fetch(`${this.interactionURI}/messages/@original`, {
            method: 'PATCH',
            headers: this.headerObject,
            body: JSON.stringify({
                type: 5,
                data: content
            })
            ,
        })
    }

    /*
    Sends a followup message.
    */
    send(content: Object){
        let resp = fetch(`${this.interactionURI}/messages/@original`, {
            method: 'POST',
            headers: this.headerObject,
            body: JSON.stringify({
                type: 5,
                data: content
            })
            ,
        })
        return resp;
    }

    /*
    ACK ping.
    */
    ping(){
        fetch(this.interactionURI, {
            method: 'POST',
            headers: this.headerObject,
            body: JSON.stringify({
                type: 1,
                data: null
            })
            },
        )
    }

    /*
    Deletes the original message.
    */
    delete(){
        fetch(`${this.interactionURI}/messages/@original`, {
            method: 'DELETE',
            headers: this.headerObject,
            body: JSON.stringify({
                type: 1,
                data: null
            })
            },
        )
    }

}