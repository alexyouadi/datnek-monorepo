
import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const events = [
      { id: 1, nom: 'Événement 1', dateDebut: '', meetingLink: '', addresse: '', heurDebut: '', heurFin: '', dateFin: '', typeEvenement: 'en ligne', description:'', profile:'', organisateur:'' },
      { id: 2, nom: 'Événement 2', dateDebut: '', meetingLink: '', addresse: '', heurDebut: '', heurFin: '', dateFin: '', typeEvenement: 'en presence', description:'', profile:'', organisateur:'' },
      { id: 2, nom: 'Événement 3', dateDebut: '', meetingLink: '', addresse: '', heurDebut: '', heurFin: '', dateFin: '', typeEvenement: 'en presence', description:'', profile:'', organisateur:'' }
    
    ];
    return { events };
  }
}