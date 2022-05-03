import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = 'http://localhost:5000/'
  constructor(private http: HttpClient) { }

  getEtudiants() {
    return this.http.get(this.url+'etudiants')
  }
  addEtudiant(body) {
    return this.http.post(this.url+'etudiants', body)
  }
  updateEtudiant(body) {
    return this.http.put(this.url+'etudiants', body)
  }
  deleteEtudiant(id) {
    return this.http.delete(this.url+'etudiants/' + id)
  }

  getMatieres() {
    return this.http.get(this.url+'matieres')
  }
  addMatiere(body) {
    return this.http.post(this.url+'matieres', body)
  }
  updateMatiere(body) {
    return this.http.put(this.url+'matieres', body)
  }
  deleteMatiere(id) {
    return this.http.delete(this.url+'matieres/' + id)
  }

  getNotes() {
    return this.http.get(this.url+'notes')
  }
  addNote(body) {
    return this.http.post(this.url+'notes', body)
  }
  updateNote(body) {
    return this.http.put(this.url+'notes', body)
  }
  deleteNote(id) {
    return this.http.delete(this.url+'notes/' + id)
  }

  moyenneEtudiant(id){
    return this.http.get(this.url+'etudiant/note/'+id)

  }
  moyenneMatiere(id){
    return this.http.get(this.url+'matiere/note/'+id)

  }
}
