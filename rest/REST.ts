import { Channels } from "./channelRest"
import { Interactions } from "./interactionRest"
import { Webhooks } from "./webhookRest"
import { Users } from "./userRest"
import { Applications } from "./applicationRest"
import { Guilds } from "./guildsRest"

/**
 * Main body of the REST api wrapper.
 */
export const REST = {
    /**
    * Object containing the methods relating to the Interaction endpoint.
    */
    Interactions,
    /**
    * Object containing methods related to the Webhook endpoint.
    */
    Webhooks,
    /**
     * Object containing methods related to the Channel endpoint
     */
    Channels,
    /**
     * Object containing methods related to the User endpoint.
     */
    Users,
    /**
     * Object containing methods related to the Application endpoint.
     */
    Applications,
    /**
     * Object containing methods related to the Guild endpoint.
     */
    Guilds
}





