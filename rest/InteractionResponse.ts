import { Interaction } from "../classes/interactions/Interaction";
import { interactionCallback } from "../enums/InteractionCallback";
import { DiscordAPIResponse } from "../types/Discord/discordAPIResponse";

export async function restReply(content: Object, interaction: Interaction, callback: interactionCallback): Promise<DiscordAPIResponse>{
    let resp = await fetch(`${this.interactionURI}/${interaction.id}/${interaction.token}/callback`, {
        method: 'POST',
        headers: interaction.headerObject,
        body: JSON.stringify({
            type: callback,
            data: content
        })
    })
    return (await resp.json() as DiscordAPIResponse)
}

export async function deleteReply(interaction: Interaction): Promise<DiscordAPIResponse> {
    const fetchResponse = await fetch(`${interaction.webhookURI}/${interaction.client.user.id}/${interaction.token}/messages/@original`, {
        method: 'DELETE',
        headers: interaction.headerObject,
        body: JSON.stringify({
            type: 0,
            data: null
        })
        },
    )
    return (await fetchResponse.json())
}

export async function followupSend(content: Object, interaction: Interaction): Promise<DiscordAPIResponse> {
    const fetchResponse = await fetch(`${interaction.webhookURI}/${interaction.client.user.id}/${interaction.token}/messages/@original`, {
        method: 'POST',
        headers: interaction.headerObject,
        body: JSON.stringify({
            type: interactionCallback.channelMessageWithSource,
            data: content
        })
    })
    return (await fetchResponse.json())
}

export async function ping(interaction: Interaction): Promise<DiscordAPIResponse>{
    const fetchResponse = await fetch(`${interaction.interactionURI}/${interaction.id}/${interaction.token}`, {
        method: 'POST',
        headers: this.headerObject,
        body: JSON.stringify({
            type: interactionCallback.pong,
            data: null
        })
        },
    )
    return (await fetchResponse.json()) 
}

export async function editReply(content, interaction: Interaction): Promise<DiscordAPIResponse>{
    const fetchResponse = await fetch(`${interaction.webhookURI}/${interaction.client.user.id}/${interaction.token}/messages/@original`, {
        method: 'PATCH',
        headers: this.headerObject,
        body: JSON.stringify(content)
    })
    return (await fetchResponse.json())
}