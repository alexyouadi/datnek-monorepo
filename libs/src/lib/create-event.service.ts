import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { EventInput } from './create-event.inputdto';
import { Observable } from 'rxjs';
import { EventOutput } from './create-event.outputdto';


@Injectable({

    providedIn:'root'
})

export class EventService {

    constructor( private http : HttpClient){

    }

    private apiUrl = 'api/events'


    createUnEvenement(event : EventInput.Create): Observable<EventOutput.Create>{

        return this.http.post<EventOutput.Create>(  `${this.apiUrl}`, event);
    }
}