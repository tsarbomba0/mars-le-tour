/**
 * Class for the Action Row
 */
export class ActionRow {
    components: Array<Object>
    type: number = 1
    constructor(components: Array<Object>){
        this.components = components
    }

    /**
     * Return object as JSON.
     * @returns Object
     */
    finalize(): Object {
        return this
    }
}