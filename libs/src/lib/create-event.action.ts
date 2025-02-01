import { EventInput } from "./create-event.inputdto";

export namespace EventAction {


    export class Create{

        static readonly type = '[Event] add'

        constructor( public payload: EventInput.Create){

        }
    }
}