const { EventEmitter } = require('events');
import { Events } from '../enums/Events'
import { discordPayload, discordPayloadData } from "../types/Discord/discordPayload";
import { User } from "./Guild/User";
import WebSocket from "ws";
import { Guild } from "./Guild/Guild";
import { GuildMember } from "./Guild/GuildMember";
import { InteractionOptions } from "../types/Options/InteractionOptions";
import { Interaction } from "./interactions/Interaction";
import { discordGuildOptions } from "../types/Discord/discordGuildOptions";
import { Message, messageOptions } from "./Message";
import { REST } from "../rest/REST";
import { DMChannel } from "./Channel";
import { discordPresenceUpdate } from '../types/Discord/discordPresence';
import { BotPresence, discordStatus } from './BotPresence';
import { ActivityTypes } from '../enums/ActivityTypes';
import { URL } from '../types/Media/URL';


/**
 * Class representing a discord Client
 */
export class DiscordClient extends EventEmitter {
    
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
    token: string;
    
    constructor(token: string, presenceOptions?: {
        type?: ActivityTypes,
        name?: string,
        status: discordStatus
    }){
        super();

        // property assignment
        this.token = token
        this.gatewayApiConnection = new WebSocket('wss://gateway.discord.gg/?v=10&encoding=json')
        this.guilds = new Map()


        // In case of the connection being closed.
        // Will reconnect if the code is in the resumeCodes array.
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
                }), (error) => {
                    throw error
                })
            }
            console.log("Reconnected")
        })

        // In case of an error.
        this.gatewayApiConnection.on('error', (error) =>{
            throw error
        })

        // On opened connection.
        this.gatewayApiConnection.on('open', async (): Promise<void> => {
            this.gatewayApiConnection.on('message', async (rawMessage: WebSocket.RawData): Promise<void> => {
                let jsonMessage: discordPayload = JSON.parse(rawMessage.toString()) // Message converted to String from Buffer and parsed to a object
                this.heartbeatValue = jsonMessage.s // value of s key from messages to continue heartbeat to the gateway
                let gatewayData: unknown | null = jsonMessage.d  
                // Switch case for opcodes
                switch(jsonMessage.op){
                    case 0: // OPCODE 0 -> dispatch event
                        switch(jsonMessage.t){
                            // READY => this case DOESN'T emit the event, the GUILD_CREATE case does under a special condition
                            case Events.ready: if(gatewayData){
                                let data: discordPayloadData = gatewayData as discordPayloadData
                                [this.user, this.sessionId, this.resumeUrl, this.launchExpectedGuilds] = 
                                [
                                    data.user, 
                                    data.session_id, 
                                    data.resume_gateway_url, 
                                    data.guilds.length
                                ]
                            };
                            break;

                            /*
                            Guild events
                            */
                            // GUILD_CREATE => emits ready when the amount of unavailable guilds is equal to the amount of guilds in the map
                            case Events.guildCreate: 
                                if(gatewayData){
                                    let newGuild = new Guild((gatewayData as discordGuildOptions), this.token)
                                    this.guilds.set(newGuild.id, newGuild)
                                    if(!this.ready){
                                        this.launchActualGuilds += 1
                                        if(this.launchActualGuilds === this.launchExpectedGuilds){
                                            this.emit("ready", newGuild)
                                            this.ready = true
                                        }
                                    }
                                }
                            break;
                            // GUILD_DELETE
                            case Events.guildDelete:
                                gatewayData ? this.guilds.delete((gatewayData as Guild).id) : () => {throw new Error(`Event ${Events.guildDelete} has null data`);}
                                this.emit(Events.guildDelete)
                            break;
                            // GUILD_UPDATE
                            case Events.guildUpdate: 
                                gatewayData ? true : () => {throw new Error(`Event ${Events.guildUpdate} has null data`);}
                                /* TODO FIGURE THIS OUT?
                                let oldGuild = this.guilds.get(gatewayData!.id)!
                                Object.keys(gatewayData!).map((key) => {
                                    this.guilds.get(gatewayData!.id)![key] = gatewayData![key]
                                })
                                */
                                this.guilds.set((<Guild>gatewayData)!.id, new Guild((gatewayData as discordGuildOptions), this.token))  // To be replaced
                                this.emit(Events.guildUpdate)
                            break;   
                            // GUILD_MEMBER_ADD
                            case Events.guildMemberAdd: 
                                gatewayData ? true : () => {throw new Error(`Event ${Events.guildMemberAdd} has null data`);}
                                Object.keys(gatewayData!).map((key) => {
                                    this.guilds.get((<Guild>gatewayData)!.id)!.members.set((<Guild>gatewayData)!?.id!, (gatewayData! as GuildMember)) 
                                })
                                this.emit(Events.guildMemberAdd)
                            break; 
                            
                            /*
                            Interaction events
                            */
                            // INTERACTION_CREATE
                            case Events.interactionCreate:
                                gatewayData ? this.emit(Events.interactionCreate, new Interaction((gatewayData as InteractionOptions), this)) : () => {throw new Error(`Event ${Events.interactionCreate} has null data`);}
                            break;

                            /* 
                            Message events 
                            */
                            // MESSAGE_CREATE
                            case Events.messageCreate: 
                                gatewayData ? this.emit(Events.messageCreate, new Message((gatewayData as messageOptions), this)) :  () => {throw new Error(`Event ${Events.messageCreate} has null data`);}
                            break;
                            // MESSAGE_DELETE
                            case Events.messageDelete: 
                                gatewayData ? this.emit(Events.messageDelete, gatewayData) :  () => {throw new Error(`Event ${Events.messageDelete} has null data`);}
                            break;
                            // MESSAGE_UPDATE
                            case Events.messageUpdate: 
                                gatewayData ? this.emit(Events.messageUpdate, new Message((gatewayData as messageOptions), this)) :  () => {throw new Error(`Event ${Events.messageUpdate} has null data`);}
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
                                gatewayData ? this.emit(Events.threadUpdate, gatewayData) : () => {throw new Error(`Event ${Events.threadUpdate} has null data`)}
                            break;
                            // THREAD_LIST_SYNC
                            case Events.threadListSync:
                                gatewayData ? this.emit(Events.threadListSync, gatewayData) : () => {throw new Error(`Event ${Events.threadListSync} has null data`)}
                            break;
                            // THREAD_MEMBER_UPDATE
                            case Events.threadMemberUpdate:
                                gatewayData ? this.emit(Events.threadMemberUpdate, gatewayData) : () => {throw new Error(`Event ${Events.threadMemberUpdate} has null data`)}
                            break;
                            // THREAD_MEMBERS_UPDATE
                            case Events.threadMembersUpdate:
                                gatewayData ? this.emit(Events.threadMembersUpdate, gatewayData) : () => {throw new Error(`Event ${Events.threadMembersUpdate} has null data`)}
                            break;

                            /*
                            Presence events
                            */
                            case Events.presenceUpdate:
                                gatewayData ? this.emit(Events.presenceUpdate, (gatewayData as discordPresenceUpdate)) : () => {throw new Error(`Event ${Events.presenceUpdate} has null data!`)}
                            break;
                        }
                        break;

                    // OPCODE 10
                    case 10: 
                        // If d field contains heartbeat_interval, set it as the new one.
                        if(jsonMessage?.d?.heartbeat_interval){
                            this.heartbeatInterval = jsonMessage.d.heartbeat_interval; 
                        }

                        // Timeout to send a opcode 1 reply in (heartbeatInterval*jitter) ms.
                        // Jitter is a random number between 0 and 1.
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
                                },
                            }}));

                        // Send a heartbeat every heatbeatInterval ms with opcode 1 and data field as the last message's sequence field
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
    
    /**
     * Method to create or retrive a DM channel with a user.
     * @param {string} userId The ID of the user.
     * @returns {Promise<DMChannel>}
     */
    public async createDM(userId: string): Promise<DMChannel>{
        let channelOptions = await REST.Users.post({
            recipient_id: userId
        }, this.token)
        const channel = new DMChannel(channelOptions, this.token)
        return channel
    }

    /**
     * Sets the presence for the bot.
     * @param {ActivityTypes} type Activity type.
     * @param {discordStatus} status Discord status. 
     * @param {number|null} afkSince Miliseconds since going off idle.
     * @param {string} name Name of the activity. 
     * @param {URL} url URL. 
     * @param {boolean} isAfk If bot is afk. 
     */
    public async setPresence(type: ActivityTypes, 
        status: discordStatus,
        afkSince: number|null,
        name?: string, 
        url?: URL, 
        isAfk?: boolean
    ){
        this.gatewayApiConnection.send(
            JSON.stringify({
                op: 3,
                d: new BotPresence(type, status, afkSince, name, url, isAfk)
            }, null, 2)
        )
    }
    
}   