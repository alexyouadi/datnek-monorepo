import { State, StateContext, Action } from '@ngxs/store';
import { Injectable } from "@angular/core";
import { Observable, tap } from 'rxjs';
import { EventInput } from '../../dto/input/input';
import { EventService } from '../../services/service';
import { EventAction } from '../action/action';
import { EventOutput } from '../../dto/output/output';



export interface EventStateModel {

    events: EventInput.Update[]
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
    
    


   @Action(EventAction.UpdateEvent)


   update(contex:StateContext<EventStateModel> , Action:EventAction.UpdateEvent){

    return this.service.mettreAJourUnEvenement(Action.payload).pipe(

        tap(
            (result:EventOutput.Update) => {
///on récupère dabort l'état actuel du store ngxs.
                const state =contex.getState();
//on recherche l'index de l'événement à mettre à jour dans le tableau state.events en utilisant l'ID de l'événement (action.payload.id).
                const eventIndex = state.events.findIndex(e => e.id === Action.payload.id);
//on verifi  si l'événement a été trouvé dans le tableau events
                if(eventIndex !== -1){
//on crée une copie du tableau state.events en utilisant l'opérateur de décomposition
                    const updatevents = [...state.events];

                    const updatevent : EventOutput.Update = {

                        ...updatevents[eventIndex],

                        ...result

                    };
//on remplace l'ancien événement dans la copie du tableau updatedEvents par le nouvel événement mis à jour.
                   updatevents[eventIndex]=updatevent;

                   contex.setState(
                    {
                        ...state,

                        events:updatevents
                    }

                   );

                }
            }
        )
    );
   }

       
               






        
}


