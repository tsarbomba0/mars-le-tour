import { EventEmitter } from "stream";
import { Events } from '../enums/Events'
import { discordPayload, discordPayloadData } from "../types/discordPayload";
import { User } from "../types/User";
import WebSocket from "ws";
import { Guild } from "../types/Guild";
import { GuildMember } from "../types/GuildMember";
import { InteractionOptions } from "../types/InteractionOptions";
import { Interaction } from "./Interaction";



export class DiscordClient extends EventEmitter {
    private token: string;
    private resumeUrl: string;
    private sessionId: string;
    private gatewayApiConnection: WebSocket
    private heartbeatValue: number | null;
    private launchExpectedGuilds: number;
    private launchActualGuilds: number = 0;
    private heartbeatInterval: number;
    private resumeCodes: Array<number> = [4000, 4001, 4002, 4003, 4005, 4007, 4008, 4009];

    guilds: Map<string, Guild>;
    user: User;
    username: string;
    ready: boolean = false;

    constructor(token: string){
        super();

        // property assignment
        this.token = token
        this.gatewayApiConnection = new WebSocket('wss://gateway.discord.gg/?v=10&encoding=json')
        this.guilds = new Map()


        // Closed connection (will attempt to reconnect on status codes: )
        this.gatewayApiConnection.on('close', (code) => {
            console.log(`Connection closed! Code: ${code}`)
            if(this.resumeCodes.includes(code)){
                this.gatewayApiConnection = new WebSocket(this.resumeUrl)
                this.gatewayApiConnection.send(JSON.stringify({
                    op: 6,
                    d: {
                        token: this.token, 
                        session_id: this.sessionId,
                        seq: this.heartbeatValue,
                    }
                }))
            }

        })

        this.gatewayApiConnection.on('error', (err) =>{
            console.log(err)
        })

        // on open
        this.gatewayApiConnection.on('open', async (): Promise<void> => {
            this.gatewayApiConnection.on('message', async (rawMessage: WebSocket.RawData): Promise<void> => {
                let jsonMessage: discordPayload = JSON.parse(rawMessage.toString()) // Message converted to String from Buffer and parsed to a object
                this.heartbeatValue = jsonMessage.s // value of s key from messages to continue heartbeat to the gateway
                let gatewayData: discordPayloadData | null = jsonMessage.d  

                // Switch case for opcodes
                switch(jsonMessage.op){
                    case 0: // OPCODE 0 -> dispatch event
                        switch(jsonMessage.t){
                            // READY => this case DOESN'T emit the event, the GUILD_CREATE case does under a special condition
                            case Events.ready: if(gatewayData){
                                [this.user, this.sessionId, this.resumeUrl, this.launchExpectedGuilds] = 
                                [gatewayData.user, gatewayData.session_id, gatewayData.resume_gateway_url, gatewayData.guilds.length]
                                console.log(this.launchExpectedGuilds)
                            };
                            break;

                            /*
                            Guild events
                            */
                            // GUILD_CREATE => emits ready when the amount of unavailable guilds is equal to the amount of guilds in the map
                            case Events.guildCreate: 
                                if(gatewayData){
                                    this.guilds.set(gatewayData.id, (gatewayData as Guild))
                                    if(!this.ready){
                                        this.launchActualGuilds += 1
                                        if(this.launchActualGuilds === this.launchExpectedGuilds){
                                            this.emit("ready", (gatewayData as Guild))
                                            this.ready = true
                                        }
                                    }
                                }
                            break;
                            // GUILD_DELETE
                            case Events.guildDelete:
                                gatewayData ? this.guilds.delete(gatewayData.id) : () => {throw new Error(`Event ${Events.guildDelete} has null data`);}
                                this.emit(Events.guildDelete)
                            break;
                            // GUILD_UPDATE
                            case Events.guildUpdate: 
                                gatewayData ? true : () => {throw new Error(`Event ${Events.guildUpdate} has null data`);}
                                let oldGuild = this.guilds.get(gatewayData!.id)!
                                Object.keys(gatewayData!).map((key) => {
                                    this.guilds.get(gatewayData!.id)![key] = gatewayData![key]
                                })
                                this.emit(Events.guildUpdate)
                            break;   
                            // GUILD_MEMBER_ADD
                            case Events.guildMemberAdd: 
                                gatewayData ? true : () => {throw new Error(`Event ${Events.guildMemberAdd} has null data`);}
                                Object.keys(gatewayData!).map((key) => {
                                    this.guilds.get(gatewayData!.id)!.members.push((gatewayData! as GuildMember)) 
                                })
                                this.emit(Events.guildMemberAdd)
                            break; 
                            
                            /*
                            Interaction events
                            */
                            // INTERACTION_CREATE
                            case Events.interactionCreate:
                                gatewayData ? this.emit(Events.interactionCreate, new Interaction((gatewayData as InteractionOptions))) : () => {throw new Error(`Event ${Events.interactionCreate} has null data`);}
                            break;

                            /*
                            Message events TODO: Message object 
                            */
                            // MESSAGE_CREATE
                            case Events.messageCreate: 
                                gatewayData ? this.emit(Events.messageCreate, gatewayData) :  () => {throw new Error(`Event ${Events.messageCreate} has null data`);}
                            break;
                            // MESSAGE_DELETE
                            case Events.messageDelete: 
                                gatewayData ? this.emit(Events.messageDelete, gatewayData) :  () => {throw new Error(`Event ${Events.messageDelete} has null data`);}
                            break;
                            // MESSAGE_UPDATE
                            case Events.messageUpdate: 
                                gatewayData ? this.emit(Events.messageUpdate, gatewayData) :  () => {throw new Error(`Event ${Events.messageUpdate} has null data`);}
                            break;
                            // MESSAGE_DELETE_BULK
                            case Events.messageDeleteBulk: 
                                gatewayData ? this.emit(Events.messageDelete, gatewayData) :  () => {throw new Error(`Event ${Events.messageDeleteBulk} has null data`);}
                            break;

                            /*
                            Message reaction events  TODO: Message object + Emoji object
                            */
                            // MESSAGE_REACTION_ADD
                            case Events.messageReactionAdd:
                                gatewayData ? this.emit(Events.messageReactionAdd, gatewayData) : () => {throw new Error(`Event ${Events.messageReactionAdd} has null data`);}
                            break;
                            // MESSAGE_REACTION_REMOVE
                            case Events.messageReactionRemove:
                                gatewayData ? this.emit(Events.messageReactionRemove, gatewayData) : () => {throw new Error(`Event ${Events.messageReactionRemove} has null data`);}
                            break;
                            // MESSAGE_REACTION_REMOVE_ALL
                            case Events.messageReactionRemoveAll:
                                gatewayData ? this.emit(Events.messageReactionRemoveAll, gatewayData) : () => {throw new Error(`Event ${Events.messageReactionRemoveAll} has null data`);}
                            break;
                            // MESSAGE_REACTION_REMOVE_EMOJI
                            case Events.messageReactionRemoveEmoji:
                                gatewayData ? this.emit(Events.messageReactionRemoveEmoji, gatewayData) : () => {throw new Error(`Event ${Events.messageReactionRemoveEmoji} has null data`);}
                            break;
                            
                            /*
                            Thread events TODO: Message object 
                            */
                            // THREAD_CREATE
                            case Events.threadCreate:
                                gatewayData ? this.emit(Events.threadCreate, gatewayData) : () => {throw new Error(`Event ${Events.threadCreate} has null data`);}
                            break;
                            // THREAD_DELETE
                            case Events.threadDelete:
                                gatewayData ? this.emit(Events.threadDelete, gatewayData) : () => {throw new Error(`Event ${Events.threadDelete} has null data`);}
                            break;
                            // THREAD_UPDATE
                            case Events.threadUpdate:
                                gatewayData ? this.emit(Events.threadUpdate, gatewayData) : () => {throw new Error(`Event ${Events.threadUpdate} has null data`);}
                            break;
                            // THREAD_LIST_SYNC
                            case Events.threadListSync:
                                gatewayData ? this.emit(Events.threadListSync, gatewayData) : () => {throw new Error(`Event ${Events.threadListSync} has null data`);}
                            break;
                            // THREAD_MEMBER_UPDATE
                            case Events.threadMemberUpdate:
                                gatewayData ? this.emit(Events.threadMemberUpdate, gatewayData) : () => {throw new Error(`Event ${Events.threadMemberUpdate} has null data`);}
                            break;
                            // THREAD_MEMBERS_UPDATE
                            case Events.threadMembersUpdate:
                                gatewayData ? this.emit(Events.threadMembersUpdate, gatewayData) : () => {throw new Error(`Event ${Events.threadMembersUpdate} has null data`);}
                            break;
                        }
                        break;
                    case 10: // OPCODE 10
                        if(jsonMessage?.d?.heartbeat_interval){
                            this.heartbeatInterval = jsonMessage.d.heartbeat_interval; 
                        }
                        // Timeout to send a opcode 1 reply in (heartbeatInterval*Math.random()) ms
                        setTimeout(() => {
                            this.gatewayApiConnection.send(JSON.stringify({
                                op: 1,
                                d: this.heartbeatValue
                            }))
                        }, this.heartbeatInterval*Math.random());
                        // IDENTIFY payload
                        this.gatewayApiConnection.send(JSON.stringify({
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
                                this.gatewayApiConnection.send(JSON.stringify({
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