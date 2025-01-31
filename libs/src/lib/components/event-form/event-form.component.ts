import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions, FormlyModule } from '@ngx-formly/core';
import { EventInput } from '../../dto/input/event.input';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'datnek-app-event-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormlyModule],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.css',
})
export class EventFormComponent {

//recuperation des valeur transmis par le parents
  @Input() event : EventInput.Create ={

    id: 0,
  nom: '',
  dateDebut: '',
  typeEvenement: '',
  photoProfil:'',
  meetingLink: '',
  addresse: '',
  heurDebut: '',
  heurFin: '',
  dateFin: '',
  description:'',
  organisateur:'',
  showMenu: false
  
    

  }
// emission d'un evenement de conffirmation du formulaire suis a des valeur transmis par le parent
  @Output() confirmeFormulaire = new EventEmitter<EventInput.Create>();


  constructor(
    
    @Inject(ToastrService) private toastr: ToastrService
  ) {}

  form = new FormGroup({});

  model = {...this.event, intervenants: [],
    showMenu: true};

  
  options: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [

    {
      key: 'photoProfile',
      type: 'input',
      templateOptions: {
        label: 'Téléchargez une photo de couverture',
        type: 'file',
        description: 'Largeur minimum de 1280 X 720',
        required: true,
      }
    },

    {
      key: 'organisateur',
      type: 'select',
      templateOptions: {
        label: 'Organisateur',
        options: [
          { label: 'Conférence', value: 'conference' },
          { label: 'Webinaire', value: 'webinar' },
          { label: 'Atelier', value: 'workshop' },
        ],
        required: true,
      },
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

      }
    },
    {
      key: 'meetingLink',
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
      key: 'addresse',
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
      key: 'nom',
      type: 'input',
      templateOptions: {
        label: 'Nom',
        required: true,
      },

    },

    {
      key: 'dateDebut',
      type: 'input',
      templateOptions: {
        type: 'date',
        label: 'Date de Début',
        required: true,
      },

    },
    
    {
      key: 'heurDebut',
      type: 'input',
      templateOptions: {
        type: 'time',
        label: 'Heure de Début',
        required: true,
        
      },
      hideExpression: (model) => !model.dateDebut
    },

    {
      key: 'heurFin',
      type: 'input',
      templateOptions: {
        type: 'time',
        label: 'Heure de Fin',
        required: true,
      },
      hideExpression: (model) => !model.dateDebut
    },

    {
      key: 'dateFin',
      type: 'input',
      templateOptions: {
        type: 'date',
        label: 'Date de Fin',
        required: true,
      },
      hideExpression: (model) => !model.dateDebut
    },


    {
      key: 'description',
      type: 'textarea',
      templateOptions: {
        label: 'Description',
        required: true,
      },

    },

    {
      key: 'intervenants',
      type: 'intervenant',
      templateOptions: {
        label: 'Liste des Intervenants',
        required:true
      },
    },

   

  ];

validerFormulaire(){

  if(this.form.valid){

    this.confirmeFormulaire.emit(this.model);

    this.toastr.success('Événement enregistré avec succès !', 'Succès', {

      timeOut: 3000,

      positionClass: 'toast-top-right',

    });

    this.closeModal();


  }
}

closeModal(){
  
  (document.getElementById('eventModal') as HTMLElement ).style.display ='none'; 

}




}

