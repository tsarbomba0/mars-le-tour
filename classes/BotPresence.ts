import { ActivityTypes } from "../enums/ActivityTypes";
import { Activity } from "../types/Discord/discordPresence";
import { URL } from "../types/Media/URL";

export type discordStatus = "online"|"dnd"|"idle"|"invisible"|"offline"

/**
 * Class for creating a presence for the Bot.
 */
export class BotPresence {
    since: number|null;
    activities: Array<Activity>
    status: discordStatus
    afk: boolean

    constructor(type: ActivityTypes, 
        status: discordStatus,
        afkSince: number|null,
        name?: string, 
        url?: URL, 
        isAfk?: boolean
        )
    {
        let returnObject = {
            since: afkSince,
            activities: [{
                name: name,
                type: type,
                
            }],
            status: status,
            afk: isAfk ? isAfk : false
        }
        if(url){
            returnObject.activities[0]['url'] = url
        }
        return returnObject
    }
}