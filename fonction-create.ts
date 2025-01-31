import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StateContext } from '@ngxs/store';
import { Observable } from 'rxjs';


// dto input
export namespace EventInput{

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
        showMenu: boolean; // Ajouter cette propriété
   
     }
}

//dto outout

export namespace EventOutput{

    export class Create{

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
        showMenu: boolean; // Ajouter cette propriété
    }

    
}

// action

export namespace EventAction {
    export class Create {
      static readonly type = '[Event] Create';
      constructor(public payload: EventInput.Create) {}
    }
}


//service 

export class EventService {


    constructor( private http:HttpClient){}
 private apiUrl = 'api/events'

 createUnEvenement( event:EventInput.Create): Observable<EventOutput.Create>{

    return this.http.post<EventOutput.Create>(`${this.apiUrl}`,event);
 }


}


// state


export interface EventStateModel{

    events: EventOutput.Create[];
}

@State<EventStateModel>(
    {
        name:'events',
        defaults:{
            events:[]
        }
    }
)

@Injectable()

export class EventState{

constructor(private service : EventService){}

}



@Action(EventAction.Create)

create(contex : StateContext<EventStateModel>, action : EventAction.Create) {


    return this.service.createUnEvenement(action.payload).pipe(

        tap(

            (resul:EventOutput.Create) => {

                const state = contex.getState();

                contex.setState(

                    {
                        ...state,

                        events:[

                            ...state, resul
                        ]

                        
                        

                    }
                );
            }
        )
    );



}





