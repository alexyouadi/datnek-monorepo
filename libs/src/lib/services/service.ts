import { HttpClient } from '@angular/common/http';

import { Injectable } from "@angular/core";
import { EventInput } from '../dto/input/input';
import { Observable } from 'rxjs';
import { EventOutput } from '../dto/output/output';



@Injectable({
    providedIn:'root'
    })


    export class EventService{

      
  
    constructor(private http: HttpClient) {}
  
    private apiUrl = 'api/events'


    mettreAJourUnEvenement(data: EventInput.Update): Observable<EventOutput.Update>{

        return this.http.put<EventOutput.Update>(`${this.apiUrl}/${data.id}`,data);
    }


    }