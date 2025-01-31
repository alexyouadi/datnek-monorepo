import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { FormlyModule } from '@ngx-formly/core';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsModule } from '@ngxs/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { EventState, InMemoryDataService, IntervenantTypeComponent } from '@datnek-app/events';




export function HttpLoaderFactory(http: HttpClient) {

  return new TranslateHttpLoader(http, '');
} 




export const appConfig: ApplicationConfig = {

  providers: [provideRouter(appRoutes), importProvidersFrom(

    NgxsReduxDevtoolsPluginModule.forRoot(),

    NgxsModule.forRoot([ /** Les états ici EventState */ EventState  ]),

    BrowserModule, HttpClientModule,

    ReactiveFormsModule,FormsModule,

    FormlyModule.forRoot({
      types: [

        {name:'intervenant', component:IntervenantTypeComponent},
      ],
    }),
    FormlyBootstrapModule,
    BrowserAnimationsModule, // Pour les animations
    ToastrModule.forRoot() // Configuration de base,
,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,

        useFactory: HttpLoaderFactory,

        deps: [HttpClient]
      }
    }),
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { delay: 500 }),

    NgMultiSelectDropDownModule.forRoot(),
    




  )





  ],
};
