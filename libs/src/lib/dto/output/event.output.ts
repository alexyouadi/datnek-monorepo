
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace EventOutput {
          
  export interface Create {
    id: number;
    nom: string;
    dateDebut: string;
    typeEvenement: string;
    meetingLink: string;
    addresse: string;
    heurDebut: string;
    heurFin: string;
    dateFin: string;
    description:string;
    organisateur:string;
    photoProfil:string;
    showMenu: boolean;
   

}

export interface Get {
  id: number;
    nom: string;
    dateDebut: string;
    typeEvenement: string;
    photoProfil:string;
    meetingLink: string;
    addresse: string;
    heurDebut: string;
    heurFin: string;
    dateFin: string;
    description:string;
    organisateur:string;
    showMenu: boolean;
    

}

export interface Delete {
  id: number;
}

export interface Update {

  id: number;
  nom: string;
  dateDebut: string;
  meetingLink: string;
  addresse: string;
  photoProfil:string;
  heurDebut: string;
  heurFin: string;
  dateFin: string;
  description:string;
  organisateur:string;
  typeEvenement: string;
  showMenu: boolean;

}



}

