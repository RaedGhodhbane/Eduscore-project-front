import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/_apis/api.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private apis : ApiService) { }

  etudiants = []
  etudiants_notes = []
  etudiant_moyenne =0

  matieres = []
  matieres_notes = []
  matiere_moyenne
  ngOnInit() {
    this.apis.getEtudiants()
    .subscribe((result : any[])=>{
      this.etudiants = result
    })

    this.apis.getMatieres()
    .subscribe((result : any[])=>{
      this.matieres = result
    })
     
  }

  moyenne_etudiant(event){
    this.etudiant_moyenne = undefined
    let id = event.target.value
    this.apis.moyenneEtudiant(id)
    .subscribe((result : any[])=>{
      this.etudiants_notes = result
      if(!this.etudiants_notes || this.etudiants_notes.length < 5){
        alert('5 notes au minimum pour calculer la moyenne')
      }else{
        let somme = 0
        let tot_coef = 0
        this.etudiants_notes.map((note)=>{
          somme += (Number(note.note) * Number(note.matiere.coefficient))
          tot_coef +=  Number(note.matiere.coefficient)
        })
        this.etudiant_moyenne = somme/tot_coef

      }
    })
  }

  moyenne_matiere(event){
    this.matiere_moyenne = undefined
    //extraire l'id de la matière à partir du <option> selectionné
    let id = event.target.value

    this.apis.moyenneMatiere(id)
    .subscribe((result : any[])=>{
      this.matieres_notes = result
      if(!this.matieres_notes || this.matieres_notes.length < 5){
        alert('5 notes au minimum pour calculer la moyenne')
      }else{

        let somme = 0
        let tot_coef = 0
        this.matieres_notes.map((ligne)=>{ //parcours
          somme += (Number(ligne.note) * Number(ligne.matiere.coefficient))
          tot_coef +=  Number(ligne.matiere.coefficient)
        })
        this.matiere_moyenne = somme/tot_coef

      }

    })
  }

/*   ligne = {
    note : 15,
    matiere : {
      nom_matiere : "test" , coefficient : 2
    }
  } */
}
