import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private firestore: AngularFirestore) { }
  getUsuarios() {
    return this.firestore.collection('usuarios').snapshotChanges();
  }
  createUsuario(usuario: Usuario) {
    return this.firestore.collection('usuarios').add(usuario);
  }
}
