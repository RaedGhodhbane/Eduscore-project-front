import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'app/_apis/api.service';

@Component({
  selector: 'app-etudiants',
  templateUrl: './etudiants.component.html',
  styleUrls: []
})
export class EtudiantsComponent implements OnInit {

  constructor(private api : ApiService) { }

  liste = []
  form = new FormGroup({
    _id : new FormControl(null),
    nom : new FormControl('' , Validators.required),
    prenom : new FormControl('' , [Validators.required]),
    niveau_etudes : new FormControl('' , Validators.required)
  })
  ngOnInit() {
    this.api.getEtudiants()
    .subscribe((result : any[])=>{
      this.liste = result
      console.log(this.liste)
    })
  }

  afficher_form = false;

  ajouterForm(){
    this.form.reset();
    this.afficher_form = true
  }
  modifierForm(item){
    this.form.patchValue(item)
    this.afficher_form = true
  }

  set(){
    if(this.form.get('_id').value){
      this.api.updateEtudiant(this.form.value)
      .subscribe(()=>{
        this.ngOnInit();
        this.form.reset();
      })
    }else{
      console.log(this.form.value)
      this.api.addEtudiant(this.form.value)
      .subscribe(()=>{
        this.ngOnInit();
        this.form.reset();
      })
    }
    this.afficher_form = false;
    
  }
  supprimer(id){
    if(window.confirm('Etes vous sur de supprimer ?')){
      this.api.deleteEtudiant(id)
      .subscribe(()=>{
        this.ngOnInit();
      })
    }
    
  }
  annuler(){
    this.form.reset()
    this.afficher_form = false;
  }

}
