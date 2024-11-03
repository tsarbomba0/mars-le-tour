import { Attachment } from "../../classes/Attachment";
import { ActionRow } from "../../classes/Components/ActionRow";
import { Button } from "../../classes/Components/Button";
import { SelectMenu } from "../../classes/components/SelectMenu";
import { TextInput } from "../../classes/components/TextInput";
import { Embed } from "../../classes/Embed";

export type MessageRequest = {
    content?: string;
    tts?: boolean;
    embeds?: Array<Embed>
    attachments?: Array<Attachment> // Attachment object
    components?: Array<ActionRow|Button|SelectMenu|TextInput>
    sticker_ids?: Array<Object> // sticker object
    allowed_mentions?: Object // allowed mentions
    nonce?: string|number
    files?: unknown // TODO:
    payload_json?: string;
    flags?: number;
    enforce_nonce?: boolean
    poll?: object // poll object
    message_reference?: Object // message reference object
} 