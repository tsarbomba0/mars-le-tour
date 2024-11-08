import { discordChannel } from "../types/Discord/discordChannel";
import { DMChannel, GuildChannel, VoiceChannel } from "./Channel";

/**
 * Class for a Discord category containing channels
 */
export class CategoryChannel extends Map<string, any> {
    children: Map<string, DMChannel|VoiceChannel|GuildChannel>
    version: number;
    type: number;
    position: number;
    permissionOverwrites: Array<object>
    name: string;
    id: string;
    flags: number;
    constructor(options: discordChannel, channelInCategory?: DMChannel|VoiceChannel|GuildChannel){
        super();
        this.children = new Map
        this.set("version", options.version)
        this.set("type", 4)
        this.set("position", options.position)
        this.set("permissionOverwrites", options.permission_overwrites)
        this.set("name", options.name)
        this.set("id", options.id)
        this.set("flags", options.flags)
    }

    addChild(child: DMChannel|VoiceChannel|GuildChannel){
        this.children.set(child.id, child)
    }
}