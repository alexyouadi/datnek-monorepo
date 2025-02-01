import { State, StateContext, Action } from '@ngxs/store';

import { Injectable } from "@angular/core";
import { EventInput } from "./create-event.inputdto";
import { EventService } from './create-event.service';
import { EventAction } from './create-event.action';
import { EventOutput } from './create-event.outputdto';
import { Observable, tap } from 'rxjs';



export interface EventStateModel {

    events: EventInput.Create[]
}

@State<EventStateModel>(
    {
        name:'events',
        defaults:{

            events: []
        }
    }
)

@Injectable()

export class EventState{


    constructor(private service: EventService){}
    
    

 /**
   * Action pour ajouter un événement.
   * 
   * @param contex Le contexte de l'état.
   * 
   * @param action L'action AddEvent contenant les données de l'événement à ajouter.
   * 
   * @returns Un Observable qui émet l'événement ajouté.
   */

   @Action(EventAction.Create)

        add(contex :StateContext<EventStateModel>, action : EventAction.Create) {

            return this.service.createUnEvenement(action.payload).pipe(

                tap(

                    (resul:EventOutput.Create) => {

                        const state = contex.getState();

                        contex.setState(
                            {
                                ...state,

                                events:
                                [
                                    ...state.events, resul
                                ]
                            }
                        );
                    }
                )
            );
        } 







        
}











