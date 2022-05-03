import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'app/_apis/api.service';

@Component({
  selector: 'app-matieres',
  templateUrl: './matieres.component.html',
  styleUrls: []
})
export class MatieresComponent implements OnInit {

  constructor(private api : ApiService) { }

  liste = []

  form = new FormGroup({
    _id : new FormControl(null),
    nom_matiere : new FormControl('' , Validators.required),
    coefficient : new FormControl(1 , [Validators.required , Validators.max(3) , Validators.min(1)])
  })

/* fonction d'initialisation */
  ngOnInit() {
    this.api.getMatieres()
    .subscribe((result : any[])=>{
      /* remplissage du tableau liste par les valeurs( matiéres ) de la base de données  */
      this.liste = result
    })
  }


  ajouterForm(){
    this.form.reset()
  }

  modifierForm(matiere){
    //remplissage du formulaire par la matière selectionnée
    this.form.patchValue(matiere)
  }

  set(){
    if(this.form.get('_id').value){
      //en mode modification 
      this.api.updateMatiere(this.form.value)
      .subscribe((response)=>{
        this.ngOnInit(); // pour mettre à jour la liste
        this.form.reset(); //vider le formulaire
      })
    }else{
      this.api.addMatiere(this.form.value) //faire appel au service ( base de donnée)
      .subscribe((response)=>{  // get resultat du serveur
        this.ngOnInit(); 
        this.form.reset();
      })
    }
    
  }
  supprimer(id){
    if(window.confirm('Etes vous sur de supprimer ?')){ // true si boutton ok cliqué
      this.api.deleteMatiere(id)
      .subscribe(()=>{
        this.ngOnInit(); // Mettre à jour la liste
      })
    }
    
  }
  annuler(){
    this.form.reset()
  }
}
