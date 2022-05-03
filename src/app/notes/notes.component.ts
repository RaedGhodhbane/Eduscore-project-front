import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'app/_apis/api.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: []
})
export class NotesComponent implements OnInit {

  constructor(private api : ApiService) { }

  liste_notes = []
  etudiants = []
  matieres = []
  form = new FormGroup({
    _id : new FormControl(null),
    etudiant : new FormControl('' , Validators.required),
    matiere : new FormControl('' , Validators.required),
    note : new FormControl(0 , [Validators.required , Validators.max(20) , Validators.min(0)])
  })
  ngOnInit() {
    this.api.getNotes()
    .subscribe((result : any[])=>{
      this.liste_notes = result
      console.log(this.liste_notes)
    })

    this.api.getMatieres()
    .subscribe((result : any[])=>{
      this.matieres = result
    })

    this.api.getEtudiants()
    .subscribe((result : any[])=>{
      this.etudiants = result
    })
  }

  afficher_form = false;

  ajouterForm(){
    this.afficher_form = true
  }
  modifierForm(item){
    this.form.patchValue(item)
    this.afficher_form = true
  }

  set(){
    let body = this.form.value;
    if(this.form.get('_id').value){
      this.api.updateNote(this.form.value)
      .subscribe(()=>{
        this.ngOnInit();
        this.form.reset();
      })
    }else{

      let id_etudiant = this.form.get('etudiant').value
      let id_matiere = this.form.get('matiere').value

      
      let exist = this.liste_notes.find((note)=>note.etudiant._id == id_etudiant && note.matiere._id == id_matiere)

      if(exist){
        alert('Note déja existe pour cet élève')
        this.form.reset()
      }else{
        this.api.addNote(this.form.value)
        .subscribe(()=>{
          this.ngOnInit();
          this.form.reset();
        })
      }
      
    }
    this.afficher_form = false;
    
  }
  supprimer(id){
    if(window.confirm('Etes vous sur de supprimer ?')){
      this.api.deleteNote(id)
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
