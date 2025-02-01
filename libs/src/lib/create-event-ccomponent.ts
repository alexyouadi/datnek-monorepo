import { Component, Input, Output, EventEmitter, OnChanges, Inject } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { EventInput } from './create-event.inputdto';
import { EventOutput } from './create-event.outputdto';
import { Store } from '@ngxs/store';
import { EventAction } from './create-event.action';


@Component({
  selector: 'app-event-form',
  standalone: true,
  templateUrl: `<div class="modal" id="eventModal" tabindex="-1" aria-labelledby="formModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="formModalLabel">Créer un Événement</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" (click)="closeModal()"

        aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="container">
          <div class="row mb-3">
            <div class="col-12 cover-photo">
              <img id="cover-photo-preview" src="" alt="Photo de couverture">
            </div>
          </div>
          <form [formGroup]="form" (ngSubmit)="onSubmit()">
            <formly-form [model]="model" [fields]="fields" [options]="options" [form]="form"></formly-form>
            <button type="submit" class="btn btn-primary">Publier</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
`,

styles: [`
    
    .modal {
  backdrop-filter: blur(2px);
}

.modal-content {
  border-radius: 10px;
  background: #fff /* Fond semi-transparent */
}

.modal-header {
  background-color: rgba(248, 249, 250, 0.9);
  border-bottom: 1px solid #e9ecef;
}

.modal-header .modal-title {
  color: #007bff;
}

.cover-photo img {
  width: 100%;
  height: auto;
  border-radius: 5px;
  margin-bottom: 15px;
}

.btn-primary {
  width: 100%;
}

form {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

formly-form {
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
}

formly-field {
  margin-bottom: 15px;
}


  `],


  
  imports: [CommonModule, ReactiveFormsModule, FormlyModule]
})
export class EventFormComponent  {

  @Input() event!:EventInput.Create;



  form = new FormGroup({});
  options: FormlyFormOptions = {};
  model = { id: 0,
    nom: '',
    dateDebut: '',
    typeEvenement: '',
    meetingLink: '',
    addresse: '',
    heurDebut: '',
    heurFin: '',
    dateFin: '',
    description:'',
    organisateur:'',
    showMenu: false, intervenants: [], };
  fields: FormlyFieldConfig[] = [


      {
        key: 'coverPhoto',
        type: 'input',
        templateOptions: {
          label: 'Téléchargez une photo de couverture',
          type: 'file',
          description: 'Largeur minimum de 1280 X 720',
          required:true
        }

      },
      {
        key: 'organizer',
        type: 'input',
        templateOptions: {
          label: 'Organisateur',
          required: true,
          placeholder: 'Danick Takam'
        },
        expressions:{
          hide:'!model.dateDebut',

        }
      },
      {
        key: 'typeEvenement',
        type: 'multicheckbox',
        templateOptions: {
          label: 'Type d\'évènement',
          options: [
            { value: 'online', label: 'En ligne' },
            { value: 'inPerson', label: 'En Présentiel' }
          ],
          required: true
        }
      },
      {
        key: 'onlineLink',
        type: 'input',
        expressions:{
          hide: ' !model.typeEvenement.online'
        },
        // hideExpression: (model) => !model.typeEvenement?.includes('online'),
        props: {
          label: 'Lien vers le meeting en ligne',
          type: 'url',
          placeholder: 'https://',
          required: true,
          pattern: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/
        }


      },

      {
        key: 'eventAddress',
        type: 'input',
        expressions:{
          hide: ' !model.typeEvenement.inPerson'
        },
        props: {
          label: 'Adresse du lieu de l\'évènement',
          placeholder: 'Adresse',
          required: true
        }
      },

      {
        key: 'eventName',
        type: 'input',
        templateOptions: {
          label: 'Nom de l\'évènement',
          required: true,
          placeholder: 'Nom de l\'évènement'
        }
      },
      {
        key: 'dateDebut',
        type: 'input',
        templateOptions: {
          label: 'Date de début',
          type: 'date',
          required: true,

        }

      },
      {
        key: 'heurDebut',
        type: 'input',
        props: {
          label: 'Heure de début',
          type: 'time',
          required: true
        },
        expressions:{
          hide:'!model.dateDebut',

        }

      },
      {
        key: 'dateFin',
        type: 'input',
        props: {
          label: 'Date de fin',
          type: 'date',
          required: true
        },
        expressions:{
          hide:'!model.dateDebut'
        }
      },
      {
        key: 'heurFin',
        type: 'input',
        props: {
          label: 'Heure de fin',
          type: 'time',
          required: true
        },
        expressions:{
          hide: '!model.dateDebut',
        }
      },


    ];




  constructor(

     private toastr: ToastrService,
     private store : Store
  ) {}


  onSubmit(event: EventInput.Create) {

    if (this.form.valid) {

        this.store.dispatch(new EventAction.Create(event)).subscribe(() => {
            
          });

      this.toastr.success('Événement enregistré avec succès !', 'Succès', {

        timeOut: 3000,

        positionClass: 'toast-top-right',

      });

      this.closeModal();
    }

  }




  closeModal() {
    (document.getElementById('eventModal') as HTMLElement).style.display = 'none';
  }


}

