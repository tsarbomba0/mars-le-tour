import { REST } from "../../rest/REST"
import { DiscordAPIResponse } from "../../types/Discord/discordAPIResponse"

/**
 * Enum describing keyword presets.
 */
enum keywordPresets {
    profanity = 1,
    sexualContent = 2,
    slurs = 3
}

interface triggerMetadata {
    keywordFilter: Array<string>
    regexPatterns: Array<string>,
    presets: Array<keywordPresets>
    allowList: Array<string>
    mentionLimit: number
    raidProtection: boolean
}
/**
 * Enum describing Event types of a Automoderation rule.
 * 
 * messageSend -> Triggers on message.
 * memberUpdate -> Triggers on a member's updated profile.
 */
enum automoderationEventTypes {
    messageSend = 1,
    memberUpdate = 2
}

/**
 * Enum describing Trigger types of a Automoderation rule.
 * 
 * keyword -> Check if content contains words from a defined list
 * 
 * spam -> Check if content is spam
 * 
 * keywordPreset -> Check if content has words from pre-defined wordsets
 * 
 * mentionSpam -> Check if content has more unique! mentions than allowed
 * 
 * memberProfile -> Check if member's profile contains a word from a defined list
 */
enum automoderationTriggerTypes {
    keyword = 1,
    spam = 3,
    keywordPreset = 4,
    mentionSpam = 5,
    memberProfile = 6
}

/**
 * Class to create a new Discord Automoderation rule.
 * @param {string}name Name of the rule.
 */
export class AutoModerationRule {
    name: string;
    event_type: number
    trigger_type: number;
    trigger_metadata: object;
    actions: Array<object> // Action object
    enabled: boolean = true;
    exempt_roles: Array<string> // snowflake
    exempt_channels: Array<string> //snowflake

    constructor(name: string){
        this.name = name
    }

    /**
     * Sets the event type.
     * @param {automoderationEventTypes}type Event type.
     * @returns {AutoModerationRule}
     */
    setEventType(type: automoderationEventTypes): this {
        this.event_type = type
        return this
    }

    /**
     * Sets the trigger type.
     * @param {automoderationTriggerTypes}type Type of the trigger. 
     * @returns {AutoModerationRule}
     */
    setTriggerType(type: automoderationTriggerTypes): this {
        this.trigger_type = type
        return this
    }

    /**
     * Sets the trigger metadata.
     * @param {triggerMetadata}metadata Metadata for the trigger requirements 
     * @returns {AutoModerationRule}
     */
    setMetadata(metadata: triggerMetadata): this {
        this.trigger_metadata = {
            keyword_filter: metadata.keywordFilter,
            regex_patterns: metadata.regexPatterns,
            presets: metadata.presets,
            allow_list: metadata.allowList,
            mention_total_limit: metadata.mentionLimit,
            mention_raid_protection_enabled: metadata.raidProtection
        }
        return this
    }  

    /**
     * Sets the actions for the rule.
     * @param {Array<object>}actions Array of actions, describes the reaction upon triggering a rule. 
     * @returns {AutoModerationRule}
     */
    setActions(actions: Array<object>): this {
        this.actions = actions
        return this
    }

    /**
     * Sets the exempt channels and roles for the rule.
     * @param channels Array of channel IDs to be exempt from the rule.
     * @param roles Array of role IDs to be exempt from the rule.
     * @returns {AutoModerationRule}
     */
    setExempt(channels?: Array<string>, roles?: Array<string>): this{
        channels ? this.exempt_channels = channels : false
        roles ? this.exempt_roles = roles : false
        return this
    }

    /**
     * Disables the rule.
     * @returns {AutoModerationRule}
     */
    disable(): this {
        this.enabled = false;
        return this
    }

    /**
     * Returns Automoderation rule as JSON.
     * @returns {object}
     */
    toJSON(): object{
        let jsonData: object = {}
        Object.keys(this).forEach((property) => {
            if (this[property]){
                jsonData[property] = this[property]
            }
        })
        return jsonData
    }
}