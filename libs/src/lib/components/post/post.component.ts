import { Component ,Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';

@Component({
  selector: 'datnek-app-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent {
 
  /***
   *  nous utilison un subject pour emettre des evenement
   */

//Déclaration de l'Input createEvent$
  @Output() createEvent$ = new Subject<void>();

// emettons un evenement au parent lorsque cette methode est appeler
  openModal(){

    this.createEvent$.next();
  }


showoptions = false;

basculeOptions(){

  this.showoptions = !this.showoptions;
}


editEvent(){

  this.showoptions = false;
}


deleteEvent(){

  this.showoptions = false;
}





}
