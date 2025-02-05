import { EventInput } from "../../dto/input/event.input";


// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace EventAction{


    export class AddEvent{

        static readonly type ='[Event] Add';

        constructor(public payload:EventInput.Add){
        }


    }


    export class UpdateEvent{

        static readonly type = '[Event] Update';

        constructor( public payload: EventInput.Update){}
    }



    export class DeleteEvent{

        static readonly type ='[Event] Delete';

        constructor(public payload:EventInput.Delete){

        }
    }


    export class GetByIDEvent{


        static readonly type = '[Event] GetById';

        constructor( public id: number){

        }
    }



    export class GetALLEvent{

        static readonly type ='[Event] GetAll';
    }


    export class Creates {
        
        static readonly type = '[Event] Create';

        constructor(public payload: EventInput.Create) {}
      }


     








}
    