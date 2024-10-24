import { InteractionOptions } from "../types/Interaction";

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
        this.webhookURI = `https://discord.com/api/v10/webhook/${this.id}/${this.token}`
    }

    

    // methods TODO: Test
    reply(response: Object){
        fetch(this.interactionURI, {
            method: 'POST',
            headers: {
                'User-Agent': 'DiscordBot (mars-le-tour, 1.0.0)',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: 4,
                data: response
            })
            },
        )
    }
    
    defer(){
        fetch(this.interactionURI, {
            method: 'POST',
            headers: {
                'User-Agent': 'DiscordBot (mars-le-tour, 1.0.0)',
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({
                type: 5,
                data: null
            })
            ,
        })
    }
    

    edit(){
        // TODO !!!!WEBHOOKS!
    }

    send(){
        // TODO
    }

}