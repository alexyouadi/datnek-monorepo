
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { EventInput } from '../../dto/input/event.input';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { EventFormComponent } from '../event-form/event-form.component';
import { PostComponent } from '../post/post.component';
import { Store } from '@ngxs/store';
import { EventState } from '../../stores/states/event.state';
import { EventAction } from '../../stores/actions/event.action';
import { EventItemComponent } from "../event-item/event-item.component";


@Component({
  selector: 'datnek-app-event-list',
  standalone: true,
  imports: [CommonModule, EventItemComponent, PostComponent, EventFormComponent, ConfirmDeleteComponent],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css',
})
export class EventListComponent implements OnInit, AfterViewInit {


  events$! : Observable<EventInput.Add[]>;

  events: EventInput.Create[]=[];

  
  @ViewChild('confirmDeleteModal') confirmDeleteModal!: ConfirmDeleteComponent;

  @ViewChild('eventFormModal') eventFormModal!: EventFormComponent;

  @ViewChild('postComponent') postComponent!: PostComponent;

eventIdASupprimer : number |null=null

constructor(private store:Store){}
  

ngOnInit(){

    this.events$ = this.store.select(

      EventState.GetEvents
    );

    this.store.dispatch( new EventAction.GetALLEvent);

    this.events$.subscribe( (events) => 
    {
      console.log('les element sont t\'il bien recuperer :', events);

      this.events=events;
    });
}


ngAfterViewInit(){
  
  if(this.postComponent && this.postComponent.createEvent$){

    this.postComponent.createEvent$.subscribe(
      () => {
        this.openModal();
      }
      
    );
  }
  else {

    console.log('aucun composant cree n\'est definir');
  }
}



openModal(event: EventInput.Add | null = null) {
  
  this.eventFormModal.event = event || {
    id: 0,
    nom: '',
    dateDebut: '',
    typeEvenement: '',
    meetingLink: '',
    addresse: '',
    heurDebut: '',
    heurFin: '',
    photoProfil:'',
    dateFin: '',
    description:'',
   organisateur:'',
   showMenu: false
    
  };
  (document.getElementById('eventModal') as HTMLElement).style.display = 'block';

}

 recevoirSuppresion(eventId: number) {

  this.eventIdASupprimer = eventId;

  (document.getElementById('confirmDeleteModal') as HTMLElement).style.display = 'block';
}

onConfirmDelete(confirmed: boolean) {

  if (confirmed && this.eventIdASupprimer !== null) {

    // Rechargez les événements après la suppression
    this.store.dispatch(new EventAction.DeleteEvent({ id: this.eventIdASupprimer})).subscribe(() => {

      this.events$.subscribe(events => {

        this.events = events;

      });
    });
  }
  (document.getElementById('confirmDeleteModal') as HTMLElement).style.display = 'none';
}

onFormSubmit(event: EventInput.Create) {

  if (event.id) {

    this.store.dispatch(new EventAction.UpdateEvent(event)).subscribe(() => {

      this.events$.subscribe(events => {

        this.events = events;

      });

    });

  } else {

    this.store.dispatch(new EventAction.Creates(event)).subscribe(() => {

      this.events$.subscribe(events => {

        this.events = events;

      });

    });
  }
}

recevoirModification(event: EventInput.Update) {

  this.openModal(event);
}



}
