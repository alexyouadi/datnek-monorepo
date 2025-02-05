import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions, FormlyModule } from '@ngx-formly/core';
import { EventInput } from '../../dto/input/event.input';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'datnek-app-event-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormlyModule, TranslateModule],
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



  form = new FormGroup({});

  model = {...this.event, intervenants: [],
    showMenu: true};

  
  options: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [

    // {
    //   key: 'photoProfile',
    //   type: 'input',
    //   templateOptions: {
    //     label: 'Téléchargez une photo de couverture',
    //     type: 'file',
    //     description: 'Largeur minimum de 1280 X 720',
    //     required: true,
    //   }
    // },

    // {
    //   key: 'organisateur',
    //   type: 'select',
    //   templateOptions: {
    //     label: 'Organisateur',
    //     options: [
    //       { label: 'Conférence', value: 'conference' },
    //       { label: 'Webinaire', value: 'webinar' },
    //       { label: 'Atelier', value: 'workshop' },
    //     ],
    //     required: true,
    //   },
    // },
    // {
    //   key: 'typeEvenement',
    //   type: 'multicheckbox',
    //   templateOptions: {
    //     label: 'Type d\'évènement',
    //     options: [
    //       { value: 'online', label: 'En ligne' },
    //       { value: 'inPerson', label: 'En Présentiel' }
    //     ],

    //   }
    // },
    // {
    //   key: 'meetingLink',
    //   type: 'input',
    //   expressions:{
    //     hide: ' !model.typeEvenement.online'
    //   },
    //   // hideExpression: (model) => !model.typeEvenement?.includes('online'),
    //   props: {
    //     label: 'Lien vers le meeting en ligne',
    //     type: 'url',
    //     placeholder: 'https://',
    //     required: true,
    //     pattern: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/
    //   }


    // },

    // {
    //   key: 'addresse',
    //   type: 'input',
    //   expressions:{
    //     hide: ' !model.typeEvenement.inPerson'
    //   },
    //   props: {
    //     label: 'Adresse du lieu de l\'évènement',
    //     placeholder: 'Adresse',
    //     required: true
    //   }
    // },

    // {
    //   key: 'nom',
    //   type: 'input',
    //   templateOptions: {
    //     label: 'Nom',
    //     required: true,
    //   },

    // },

    // {
    //   key: 'dateDebut',
    //   type: 'input',
    //   templateOptions: {
    //     type: 'date',
    //     label: 'Date de Début',
    //     required: true,
    //   },

    // },
    
    // {
    //   key: 'heurDebut',
    //   type: 'input',
    //   templateOptions: {
    //     type: 'time',
    //     label: 'Heure de Début',
    //     required: true,
        
    //   },
    //   hideExpression: (model) => !model.dateDebut
    // },

    // {
    //   key: 'heurFin',
    //   type: 'input',
    //   templateOptions: {
    //     type: 'time',
    //     label: 'Heure de Fin',
    //     required: true,
    //   },
    //   hideExpression: (model) => !model.dateDebut
    // },

    // {
    //   key: 'dateFin',
    //   type: 'input',
    //   templateOptions: {
    //     type: 'date',
    //     label: 'Date de Fin',
    //     required: true,
    //   },
    //   hideExpression: (model) => !model.dateDebut
    // },


    // {
    //   key: 'description',
    //   type: 'textarea',
    //   templateOptions: {
    //     label: 'Description',
    //     required: true,
    //   },

    // },

    // {
    //   key: 'intervenants',
    //   type: 'intervenant',
    //   templateOptions: {
    //     label: 'Liste des Intervenants',
    //     required:true
    //   },
    // },

   

  ];


  constructor(
    @Inject(ToastrService) private toastr: ToastrService,
    private translate: TranslateService
  ) {

    {
      // Initialisation des champs Formly après l'initialisation du service de traduction
      this.fields = [
        {
          key: 'photoProfile',
          type: 'input',
          templateOptions: {
            label: this.translate.instant('FORM.COVER_PHOTO'),
            type: 'file',
            description: this.translate.instant('Largeur minimum de 1280 X 720'),
            required: true,
          },
          expressions: {
            'templateOptions.label': this.translate.stream('FORM.COVER_PHOTO'),
            'templateOptions.description': this.translate.stream('Largeur minimum de 1280 X 720'),
            
          },
        },
        {
          key: 'organisateur',
          type: 'select',
          props: {
            label: this.translate.instant('FORM.organisateur'),
            options: [
              { label: 'Conférence', value: 'conference' },
              { label: 'Webinaire', value: 'webinar' },
              { label: 'Atelier', value: 'workshop' },
            ],
            required: true,


          },expressions: {
            'props.label': this.translate.stream('FORM.organisateur'),
          },

        },
        {
          key: 'typeEvenement',
          type: 'multicheckbox',
          props: {

            label: this.translate.instant('FORM.EVENT_TYPE'),

            options: [

              { value: 'online', label: this.translate.instant('online') },
              { value: 'inPerson', label: this.translate.instant('inPerson') }
            ],
          },
          expressions: {
            'props.label': this.translate.stream('FORM.EVENT_TYPE'),
            
            
          },



        },
        {
          key: 'meetingLink',
          type: 'input',
          expressionProperties: {
            hide: ' !model.typeEvenement.online',
            'templateOptions.label': this.translate.stream('FORM.ONLINE_MEETING_LINK')
          },
          props: {
            type: 'url',
            placeholder: 'https://',
            required: true,
            pattern: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/
          }
        },
        {
          key: 'addresse',
          type: 'input',
          expressionProperties: {
            'templateOptions.label': this.translate.stream('FORM.PHYSICAL_ADDRESS'),
             hide: ' !model.typeEvenement.inPerson'
          },
          props: {
            placeholder: 'Adresse',
            required: true
          }
        },
        {
          key: 'nom',
          type: 'input',
          templateOptions: {
            label: this.translate.instant('FORM.NON'),
            required: true,
          },
          expressions: {
            'props.label': this.translate.stream('FORM.NON'),
          },

        },
        {
          key: 'dateDebut',
          type: 'input',
          templateOptions: {
            type: 'date',
            label: this.translate.instant('FORM.START_DATE'),
            required: true,
          },
          expressions: {
            'props.label': this.translate.stream('FORM.START_DATE'),
          },
        },
        {
          key: 'heurDebut',
          type: 'input',
          templateOptions: {
            type: 'time',
            label: this.translate.instant('FORM.START_TIME'),
            required: true,
          },
          hideExpression: (model) => !model.dateDebut,
          expressions: {
            'props.label': this.translate.stream('FORM.START_TIME'),
          },
        },
        {
          key: 'heurFin',
          type: 'input',
          templateOptions: {
            type: 'time',
            label: this.translate.instant('FORM.END_TIME'),
            required: true,
          },
          hideExpression: (model) => !model.dateDebut,
          expressions: {
            'props.label': this.translate.stream('FORM.END_TIME'),
          },
        },
        {
          key: 'dateFin',
          type: 'input',
          templateOptions: {
            type: 'date',
            label: this.translate.instant('FORM.END_DATE'),
            required: true,
          },
          hideExpression: (model) => !model.dateDebut,
          expressions: {
            'props.label': this.translate.stream('FORM.END_DATE'),
          },
        },
        {
          key: 'description',
          type: 'textarea',
          props: {
            label: this.translate.instant('FORM.DESCRIPTION'),
            required: true,
          },
          expressions: {
            'props.label': this.translate.stream('FORM.DESCRIPTION'),
          },

        },
        {
          key: 'intervenants',
          type: 'intervenant',
          templateOptions: {
            label: this.translate.instant('FORM.INTERVENANTS'),
            required: true
          },
          expressions: {
            'props.label': this.translate.stream('FORM.INTERVENANTS'),
          },

        }
      ];
    }


  }

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

