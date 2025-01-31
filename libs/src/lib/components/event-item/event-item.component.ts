
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventInput } from '../../dto/input/event.input';

@Component({
  selector: 'datnek-app-event-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-item.component.html',
  styleUrl: './event-item.component.css',
})
export class EventItemComponent {



  @Input() event! : EventInput.Add;
  @Output() modificationEnvoyer = new EventEmitter<EventInput.Update>(); //creation d'un evenement de modification
  @Output() suppresionEnvoyer = new EventEmitter<EventInput.Delete>();  //creation d'un evenement de supresion


  onEdite(event: EventInput.Update){
//moddification envoyer au parent
    this.modificationEnvoyer.emit(event);
  }

  openModalConfinDelete(event: EventInput.Delete){
//suppresion envoyer au parent
    this.suppresionEnvoyer .emit(event);
  }

  Menu(event: EventInput.Add){
    event.showMenu = !event.showMenu;
  }


}
