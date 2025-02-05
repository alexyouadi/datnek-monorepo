import { Action, Selector, State, StateContext } from '@ngxs/store';
import { EventOutput } from "../../dto/output/event.output";
import { Inject, Injectable } from '@angular/core';
import { EventService } from '../../services/event.service';
import { tap } from 'rxjs';
import { EventAction } from '../actions/event.action';


/**
 * Modèle de l'état des événements.
 * Représente une liste d'événements.
 */
export interface EventStateModel {
  events: EventOutput.Get[];
}

/**
 * État des événements.
 * Gère la liste des événements et les actions associées.
 */
@State<EventStateModel>({
  name: 'events',
  defaults: {
    events: []
  }
})
@Injectable()
export class EventState {

  /**
   * Injection du service d'événements.
   */
  constructor(@Inject(EventService) private eventservice: EventService) {}

  /**
   * Sélecteur pour récupérer tous les événements de l'état.
   * 
   * @param state L'état actuel des événements.
   * 
   * @returns Un tableau d'événements.
   */
  @Selector()

  static GetEvents(state: EventStateModel): EventOutput.Get[] {

      // Si l'état et la liste des événements existent, on les retourne

      if(state &&state.events){

        return state.events;
       } 
       else
       {
        console.log('aucun element existe par consequent retourne un tableau vide');
        return [];
       }

  }

  /**
   * Sélecteur pour récupérer un événement spécifique par son identifiant.
   * 
   * @param state L'état actuel des événements.
   * 
   * @returns Une fonction qui prend un identifiant en paramètre et retourne l'événement correspondant, ou undefined si non trouvé.
   */
  @Selector() 

  static getElementById(state: EventStateModel) {

    return (id: number) => state.events.find(event => event.id === id);

  }

  /**
   * Action pour ajouter un événement.
   * 
   * @param contex Le contexte de l'état.
   * 
   * @param action L'action AddEvent contenant les données de l'événement à ajouter.
   * 
   * @returns Un Observable qui émet l'événement ajouté.
   */

  @Action(EventAction.AddEvent)

  add(contex: StateContext<EventStateModel>, action: EventAction.AddEvent) {

    return this.eventservice.ajouterUnEvenement(action.payload).pipe(

      tap((result: EventOutput.Create) => {

        const state = contex.getState();

        contex.setState({

          ...state,

          events: [...state.events, result]

        });

      })

    );
  }

  /**
   * 
   * Action pour créer un événement.
   * 
   * @param contex Le contexte de l'état.
   * 
   * @param action L'action Creates contenant les données de l'événement à créer.
   * 
   * @returns Un Observable qui émet l'événement créé.
   */

  @Action(EventAction.Creates)

  create(contex: StateContext<EventStateModel>, action: EventAction.Creates) {

    return this.eventservice.creerUnEvenement(action.payload).pipe(

      tap((results: EventOutput.Create) => {

        const state = contex.getState();

        contex.setState({

          ...state,

          events: [...state.events, results]

        });

      })

    );

  }

  /**
   * Action pour supprimer un événement.
   * 
   * @param contex Le contexte de l'état.
   * 
   * @param action L'action DeleteEvent contenant les données de l'événement à supprimer (généralement l'ID).
   * 
   * @returns Un Observable qui signale la suppression de l'événement.
   */

  @Action(EventAction.DeleteEvent)

  delete(contex: StateContext<EventStateModel>, action: EventAction.DeleteEvent) {

    return this.eventservice.supprimerUnEvenementt(action.payload).pipe(

      tap(  () => {

        const state = contex.getState();

        const filterEvent = state.events.filter(e => e.id !== action.payload.id);

        contex.setState({

          ...state,

          events: filterEvent
        });

      })

    );
  }

  /**
   * Action pour mettre à jour un événement.
   * 
   * @param context Le contexte de l'état.
   * 
   * @param action L'action UpdateEvent contenant les données de l'événement à mettre à jour.
   * 
   * @returns Un Observable qui émet l'événement mis à jour.
   */

  @Action(EventAction.UpdateEvent)

  update(context: StateContext<EventStateModel>, action: EventAction.UpdateEvent) {

    return this.eventservice.mettreAJourUnEvenement(action.payload).pipe(

      tap( (result: EventOutput.Update)  => {

        const state = context.getState();

        const recherdelindex = state.events.findIndex(i => i.id === action.payload.id);

        if (recherdelindex !== -1) {

          const mettreajourlesvaleurs = [...state.events];

          const metttreajour: EventOutput.Get = {

            ...mettreajourlesvaleurs[recherdelindex],

            ...result
          };

          mettreajourlesvaleurs[recherdelindex] = metttreajour;

          context.setState({

            ...state,

            events: mettreajourlesvaleurs
          });

        }

      })

    );
  }

  /**
   * Action pour récupérer un événement par son identifiant.
   * 
   * @param context Le contexte de l'état.
   * 
   * @param action L'action GetByIDEvent contenant l'identifiant de l'événement à récupérer.
   * 
   * @returns Un Observable qui émet l'événement récupéré.
   */


  @Action(EventAction.GetByIDEvent)

  getById(context: StateContext<EventStateModel>, action: EventAction.GetByIDEvent) {

    return this.eventservice.recupererUnEvenementById(action.id).pipe(

      tap((req: EventOutput.Get) => {

        const state = context.getState();

        context.patchState({

          events: state.events.map(event => event.id === req.id ? req : event)

        });

      })

    );

  }

  /**
   * Action pour récupérer tous les événements.
   * 
   * @param contex Le contexte de l'état.
   * 
   * @returns Un Observable qui émet un tableau contenant tous les événements.
   */


  @Action(EventAction.GetALLEvent)

  getAll(contex: StateContext<EventStateModel>) {
   //Aucune charge utile d'action n'est nécessaire pour obtenir tous les événements
    return this.eventservice.recupererToutLesEvenement().pipe(

      tap( (result: EventOutput.Get[]) => {

        const state = contex.getState();

        contex.patchState({

          ...state,

          events: result // Définir directement le tableau des événements

        });

      })

    );

  }

}
