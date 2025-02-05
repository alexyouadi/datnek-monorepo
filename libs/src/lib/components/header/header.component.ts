
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CoreTranslationService } from '../../services/translate.service';


// eslint-disable-next-line @nx/enforce-module-boundaries
import { locale as menuEnglish } from './../../../../../src/assets/i18n/en';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { locale as menuFrench} from './../../../../../src/assets/i18n/fr';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { locale as menuNéerlandais} from './../../../../../src/assets/i18n/nl';



@Component({
  selector: 'datnek-app-header',
  standalone: true,
  imports: [TranslateModule,CommonModule ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit{

  public languageOptions: any;

  public selectedLanguage: any;


  constructor(public _translateservice : TranslateService, private _corstranslateservice: CoreTranslationService){



    this.languageOptions = {
      en: {
        title: 'English',
        flag: 'en' // ou un chemin vers l'image du drapeau
      },
      fr: {
        title: 'Français', // Correction orthographique
        flag: 'fr'
      },
      nl: {
        title: 'Nederlands', // Correction orthographique
        flag: 'nl'
      }
    };


    _translateservice.addLangs(['en', 'fr', 'nl']); 

        // Définir la langue par défaut au chargement du composant
        this._translateservice.setDefaultLang('en');
      

        this._translateservice.use('en'); // ou la langue stockée dans le local storage

        this._corstranslateservice.translate(menuEnglish, menuFrench, menuNéerlandais);


  }


  ngOnInit(){

     // Initialiser la langue sélectionnée au chargement du composant
     this.selectedLanguage = this._translateservice.currentLang || this._translateservice.getDefaultLang(); // important pour l'initialisation
    }

    setLanguage(language: string): void {

      this.selectedLanguage = language;

      this._translateservice.use(language);

      
    }

   
}

