import { EventEmitter } from "stream";
import { Events } from '../enums/Events'
import { discordPayload, discordPayloadData } from "../types/discordPayload";
import { User } from "../types/User";
import WebSocket from "ws";



export class DiscordClient extends EventEmitter {
    private token: string;
    private resumeUrl: string;
    private sessionId: string;
    private gatewayApiConnection: WebSocket
    private heartbeatValue: number | null;
    private launchExpectedGuilds: number;
    private launchActualGuilds: number = 0;
    private heartbeatInterval: number;
    guilds: Map<string, null|boolean|string|number|Array<string>|Object>;
    user: User;
    username: string;
    ready: boolean = false;

    constructor(token: string){
        super();

        // property assignment
        this.token = token
        this.gatewayApiConnection = new WebSocket('wss://gateway.discord.gg/?v=10&encoding=json')
        this.guilds = new Map()

        // some class-wide variables 
        const gateway = this.gatewayApiConnection
        const itself = this

        // Error and closed
        gateway.on('close', (code) => {
            console.log(`Connection terminated! Code: ${code}`)
        })

        gateway.on('error', (err) =>{
            console.log(err)
        })

        // on open
        gateway.on('open', async (): Promise<void> => {
            gateway.on('message', async (rawMessage: WebSocket.RawData): Promise<void> => {
                let jsonMessage: discordPayload = JSON.parse(rawMessage.toString()) // Message converted to String from Buffer and parsed to a object
                this.heartbeatValue = jsonMessage.s // value of s key from messages to continue heartbeat to the gateway
                let gatewayData: discordPayloadData | null = jsonMessage.d  

                // Switch case for opcodes
                switch(jsonMessage.op){
                    case 0: // OPCODE 0 -> dispatch event
                        switch(jsonMessage.t){
                            // MESSAGE_CREATE
                            case Events.messageCreate: itself.emit("messageCreate", jsonMessage.d); 
                            break; 

                            // READY => this case DOESN'T emit the event, the GUILD_CREATE case does under a special condition
                            case Events.ready: if(gatewayData){
                                [this.user, this.sessionId, this.resumeUrl, this.launchExpectedGuilds] = 
                                [gatewayData.user, gatewayData.session_id, gatewayData.resume_gateway_url, gatewayData.guilds.length]
                                console.log(this.launchExpectedGuilds)
                            };
                            break;

                            // GUILD_CREATE => emits ready when the amount of unavailable guilds is equal to the amount of guilds in the map
                            case Events.guildCreate: 
                                if(gatewayData){
                                    Object.entries(gatewayData).forEach((entry) => {
                                        this.guilds.set(entry[0], entry[1])
                                    })
                                    if(!this.ready){
                                        this.launchActualGuilds += 1
                                        if(this.launchActualGuilds === this.launchExpectedGuilds){
                                            this.emit("ready", jsonMessage.d)
                                            this.ready = true
                                        }
                                    }
                                }
                            break;
                        }
                        break;
                    case 10: // OPCODE 10
                        if(jsonMessage?.d?.heartbeat_interval){
                            this.heartbeatInterval = jsonMessage.d.heartbeat_interval; 
                        }
                        // Timeout to send a opcode 1 reply in (heartbeatInterval*Math.random()) ms
                        setTimeout(() => {
                            gateway.send(JSON.stringify({
                                op: 1,
                                d: this.heartbeatValue
                            }))
                        }, this.heartbeatInterval*Math.random());
                        // IDENTIFY payload
                        gateway.send(JSON.stringify({
                            op: 2,
                            d: {
                                token: this.token,
                                intents: 53608447, //debug: all
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
                            }, this.heartbeatInterval)
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