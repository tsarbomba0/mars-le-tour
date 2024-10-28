export class ActionRow {
    components: Array<Object>
    type: number = 1
    constructor(components: Array<Object>){
        this.components = components
    }

    finalize(): Object {
        return this
    }
}