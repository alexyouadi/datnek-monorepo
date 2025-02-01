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
        showMenu: boolean; 
   
     }
   
     export interface Add {
       id: number;
       nom: string;
       dateDebut: string;
       meetingLink: string;
       addresse: string;
       heurDebut: string;
       heurFin: string;
       dateFin: string;
       description:string;
       organisateur:string;
       typeEvenement: string;
   
     }
}