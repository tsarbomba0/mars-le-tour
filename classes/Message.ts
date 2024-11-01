import { REST } from "../rest/REST";
import { MessageRequest } from "../types/Discord/discordMessageOptions";
import { DMChannel, GuildChannel } from "./Channel";
import { ActionRow } from "./Components/ActionRow";
import { Button } from "./Components/Button";
import { SelectMenu } from "./components/SelectMenu";
import { TextInput } from "./components/TextInput";
import { DiscordClient } from "./DiscordClient";
import { Embed } from "./Embed";
import { GuildMember } from "./Guild/GuildMember";
import { User } from "./Guild/User";
import { Interaction } from "./interactions/Interaction";

let token: string;
export type messageOptions = {
    id: string;
    channel_id: string;
    author: User // Webhook identity object
    content: string|null;
    timestamp: string;
    edited_timestamp: string;
    tts: boolean;
    mention_everyone: boolean;
    mentions: Array<User>
    mention_roles: Array<string>
    mention_channels?: Array<object> // Channel mention
    attachments: Array<Object> // Attachment 
    embeds: Array<Embed>
    reactions?: Array<Object> // reaction
    nonce: number|string;
    pinned: boolean;
    webhook_id?: string;
    type: number; // message type
    activity?: Object //message activity
    application?: Object // partial application object
    application_id?: string; // app id
    flags?: number
    message_reference?: Object // message reference
    message_snapshots?: Array<Object> //message snapshot array
    referenced_message?: Message | null
    interaction_metadata?: Object // message interaction metadata object
    interaction?: Interaction // deprecated
    thread?: GuildChannel
    components? : Array<ActionRow|Button|TextInput|SelectMenu>
    sticker_items?: Array<Object> // message sticker item objects
    position?: number;
    role_subscription_data?: Object // role subscription object
    resolved?: unknown // Resolved data
    poll?: Object // poll object
    call?: object // call related to message 
    guild_id?: string;
    member?: GuildMember
}

export class Message {
    id: string;
    channelId: string;
    author: User // Webhook identity object
    content: string|null;
    timestamp: string;
    editedTimestamp: string;
    tts: boolean;
    mentionEveryone: boolean;
    mentions?: Array<User>
    mentionRoles?: Array<string>
    mentionChannels?: Array<object> // Channel mention
    attachments: Array<Object> // Attachment 
    embeds: Array<Embed>
    reactions?: Array<Object> // reaction
    nonce: number|string;
    pinned: boolean;
    webhook_id?: string;
    type: number; // message type
    activity?: Object //message activity
    application?: Object // partial application object
    application_id?: string; // app id
    flags?: number
    messageReference?: Object // message reference
    messageSnapshots?: Array<Object> //message snapshot array
    referencedMessage?: Message | null
    interactionMetadata?: Object // message interaction metadata object
    interaction?: Interaction // deprecated
    thread?: GuildChannel
    components? : Array<ActionRow|Button|TextInput|SelectMenu>
    stickerItems?: Array<Object> // message sticker item objects
    position?: number;
    roleSubscriptionData?: Object // role subscription object
    resolved?: unknown // Resolved data
    poll?: Object // poll object
    call?: object // call related to message 
    guildId?: string;
    member?: GuildMember 
    channel?: DMChannel|GuildChannel

    constructor(options: messageOptions, client: DiscordClient){
        // Client token
        token = client.token

        this.id = options.id;
        this.channelId = options.channel_id;
        this.author = options.author;
        this.content = options.content;
        this.timestamp = options.timestamp;
        this.editedTimestamp = options.edited_timestamp;
        this.tts = options.tts;
        this.mentionEveryone = options.mention_everyone;
        this.mentions = options.mentions;
        this.mentionRoles = options.mention_roles;
        this.mentionChannels = options.mention_channels;
        this.attachments = options.attachments;
        this.embeds = options.embeds;
        this.reactions = options.reactions;
        this.nonce = options.nonce;
        this.pinned = options.pinned;
        this.webhook_id = options.webhook_id;
        this.type = options.type;
        this.activity = options.activity;
        this.application = options.application;
        this.application_id = options.application_id;
        this.flags = options.flags;
        this.messageReference = options.message_reference;
        this.messageSnapshots = options.message_snapshots;
        this.referencedMessage = options.referenced_message;
        this.interactionMetadata = options.interaction_metadata;
        this.interaction = options.interaction;
        this.thread = options.thread;
        this.components = options.components;
        this.stickerItems = options.sticker_items;
        this.position = options.position;
        this.roleSubscriptionData = options.role_subscription_data;
        this.resolved = options.resolved;
        this.poll = options.poll;
        this.call = options.call;
        this.guildId = options.guild_id
        this.member = options.member
        
        if(this.guildId){
            //@ts-ignore
            this.channel = client.guilds.get(this.guildId)?.channels.get(this.channelId)
        }
    }
    public async reply(content: MessageRequest): Promise<void> {
        const resp = await REST.Channels.post(this.channelId, {
            content,
            message_reference: {
                type: 0,
                message_id: this.id,
                channel_id: this.channel?.id,
                guild_id: this.guildId,
                fail_if_not_exists: true
            }
        }, "messages", token)
        console.log((await resp))
    } 
    public async forward(): Promise<void> {
        const resp = await REST.Channels.post(this.channelId, {
            message_reference: {
                type: 1,
                message_id: this.id,
                channel_id: this.channel?.id,
                guild_id: this.guildId,
                fail_if_not_exists: true
            }
        }, "messages", token)
        console.log((await resp))
    } 
}
