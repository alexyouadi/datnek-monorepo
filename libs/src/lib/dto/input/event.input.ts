
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace EventInput{

  
  export interface Create {

    id: number;
    photoProfil:string;
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
    showMenu: boolean;
    

 }

 export interface Add {

   id: number;
   nom: string;
   photoProfil:string;
   dateDebut:string;
   meetingLink: string;
   addresse: string;
   heurDebut: string;
   heurFin: string;
   dateFin: string;
   description:string;
   organisateur:string;
   typeEvenement: string;
   
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
   photoProfil:string;
   addresse: string;
   heurDebut: string;
   heurFin: string;
   dateFin: string;
   typeEvenement: string;
   description:string;
   organisateur:string;
   showMenu: boolean;
 


 }

}


