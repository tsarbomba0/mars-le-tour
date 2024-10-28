import { ActionRow } from "../../classes/Components/ActionRow";

/**
 * Options type for the replyModal method of the Interaction class.
 */
export type ModalOptions = {
    title: string;
    custom_id: string;
    components: Array<ActionRow>
}

