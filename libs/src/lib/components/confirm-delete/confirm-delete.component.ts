import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'datnek-app-confirm-delete',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-delete.component.html',
  styleUrl: './confirm-delete.component.css',
})
export class ConfirmDeleteComponent {


  @Output() confirmer = new EventEmitter<boolean>();

  constructor(@Inject(ToastrService) private toastr: ToastrService ){}



  confirmeSupresion(){

    this.confirmer.emit(true);
    
    this.toastr.success('le poste supprimer avec succès !', 'Succès', {

      timeOut: 3000,

      positionClass: 'toast-top-right',

    });
  
  }


  annuler(){

    this.confirmer.emit(false);
  }
}

 

