import { EventInput } from "../../dto/input/input";

export namespace EventAction {


    export class UpdateEvent {


        static readonly type = '[Event], update'

        constructor (public payload: EventInput.Update){}
    }
}