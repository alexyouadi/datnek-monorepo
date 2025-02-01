import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';
import { EventAction } from './create-event.action';
import { EventOutput } from './create-event.outputdto';
import { EventService } from './create-event.service';
import { EventStateModel } from './create-event.state';

export namespace EventInput {

    export interface Create {
        id: number;
        nom: string;
        dateDebut: string;
        typeEvenement: string;
        meetingLink: string;
        addresse: string;
        heurDebut: string;
        heurFin: string;
        dateFin: string;
        description:string;
        organisateur:string;
        showMenu: boolean;
  
    }
  
    export interface Add {
      id: number;
      nom: string;
      dateDebut: string;
      meetingLink: string;
      addresse: string;
      heurDebut: string;
      heurFin: string;
      dateFin: string;
      description:string;
      organisateur:string;
      typeEvenement: string;
  
    }
  
    
  
  
  }

@State<EventStateModel>(
    {
        name: 'events',
        defaults: {
            events: []
        }
    }
)

@Injectable()

export class EventState {


    constructor(private service: EventService) { }





    @Action(EventAction.Create)

    add(contex: StateContext<EventStateModel>, action: EventAction.Create) {

        return this.service.createUnEvenement(action.payload).pipe(

            tap(

                (resul: EventOutput.Create) => {

                    const state = contex.getState();

                    contex.setState(
                        {
                            ...state,

                            events: [
                                ...state.events, resul
                            ]
                        }
                    );
                }
            )
        );
    }







    @Action(EventAction.Create)
    create(ctx: StateContext<EventStateModel>, action: EventAction.Create): Observable<EventAction.Create> {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            events: [...state.events, action.payload]
        });
        return new Observable(observer => {
            observer.next(action);
            observer.complete();
        });
    }
}
  