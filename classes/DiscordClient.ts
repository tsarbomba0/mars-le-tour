import { EventEmitter } from "stream";
import { Events } from '../enums/Events'

import WebSocket from "ws";
let heartbeatInterval: number

export class DiscordClient extends EventEmitter {
    private token: string;
    private resumeUrl: string;
    private sessionId: string;
    private gatewayApiConnection: WebSocket
    private heartbeatValue: any;

    guilds: object;
    id: string;
    username: string;
    
    constructor(token: string){
        super();

        // property assignment
        this.token = token
        this.gatewayApiConnection = new WebSocket('wss://gateway.discord.gg/?v=10&encoding=json')

        // some class-wide variables 
        const gateway = this.gatewayApiConnection
        const itself = this

        // Error and closed
        gateway.on('close', (reason) => {
            console.log(`closed! ${reason}`)
        })

        gateway.on('error', (err) =>{
            console.log(err)
        })

        // on open
        gateway.on('open', () => {
            gateway.on('message', async (rawMessage) => {
                let jsonMessage = JSON.parse(rawMessage.toString()) // Message converted to String from Buffer and parsed to a object
                this.heartbeatValue = jsonMessage.s
                // Switch case for opcodes 
                switch(jsonMessage.op){
                    case 0: // OPCODE 0 -> dispatch

                        switch(jsonMessage.t){
                            case Events.messageCreate: itself.emit("messageCreate", jsonMessage.d); break;
                        }
                        break;
        
                    case 10: // OPCODE 10
                        heartbeatInterval = jsonMessage.d.heartbeat_interval; // heartbeat interval from Hello message

                        // Timeout to send a opcode 1 reply in (heartbeatInterval*Math.random()) ms
                        setTimeout(() => {
                            gateway.send(JSON.stringify({
                                op: 1,
                                d: this.heartbeatValue
                            }))
                        }, heartbeatInterval*Math.random());


                        // IDENTIFY payload
                        gateway.send(JSON.stringify({
                            op: 2,
                            d: {
                                token: this.token,
                                intents: 53608432, //debug: all
                                properties: {
                                    os: 'Windows',
                                    browser: 'Mars-le-Tour',
                                    device: 'Mars-le-Tour'
                                }
                            }}));
                        
                        // send a heartbeat every heatbeatInterval ms with opcode 1 and data field as the last message's s field
                        (async () =>{
                            setInterval(() => {
                                gateway.send(JSON.stringify({
                                    op: 1,
                                    d: this.heartbeatValue
                                }))
                            }, heartbeatInterval)
                        })();
                        break;
                }
            })
        })        
    }
    // methods
    public async sendMessage(text: string, channelid: string): Promise<void> {
        console.log(this.token)
        const resp = await fetch(`https://discord.com/api/v10/channels/${channelid}/messages`,
            {
                method: 'POST',
                headers: {
                    'User-Agent': 'DiscordBot (mars-le-tour, 1.0.0)',
                    'Authorization': `Bot ${this.token}`,
                    'Content-Type': 'application/json',
                    
                },
                body: JSON.stringify({
                    content: text
                }),
            }
        )
        console.log(resp)
    }
}   