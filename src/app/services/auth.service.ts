import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase/app";
import { Observable } from "rxjs";
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from './api.service';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private user: Observable<firebase.User>;
  public usuarioBD: Observable<Usuario>;
  public userDetails: firebase.User = null;
  private email;
  // private provider = new firebase.auth.FacebookAuthProvider();
  constructor(private _firebaseAuth: AngularFireAuth, private router: Router, public spinner: NgxSpinnerService) {
    this.user = _firebaseAuth.authState;
    this.spinner.show();
    this.user.subscribe(user => {
      if (user) {
        this.userDetails = user;
        // console.log(this.userDetails);
        // this.router.navigate(['dashboard']);
        this.spinner.hide();
        this.email = this.userDetails.email;
      } else {
        // this.router.navigate(['auth']);
        console.log("nenhum usuario logado");
        this.spinner.hide();
        this.userDetails = null;
      }
    });

  }
  login(obj) {
    this.spinner.show();
    return this._firebaseAuth.auth
      .signInWithEmailAndPassword(obj.email, obj.senha)
      .then(() => {
        //console.log("login com sucesso");
        // //console.log(this.userDetails);
        this.spinner.hide();
      }).catch(() => {
        this.spinner.hide();
      });
  }

  createUser(user) {
    this.spinner.show();
    return this._firebaseAuth.auth
      .createUserWithEmailAndPassword(user.email, user.senha)
      .then(() => {
        var user = this._firebaseAuth.auth.currentUser;
        user
          .sendEmailVerification()
          .then(() => {
            console.error("please verify your email");
            this.spinner.hide();
          })
          .catch(err => {
            console.error(err)
            this.spinner.hide();
          });
      })
      .catch(err => {
        console.error(err)
        this.spinner.hide();
      });
  }
  isLoggedIn() {
    if (this.userDetails == null) {
      return false;
    } else {
      return true;
    }
  }
  isAuthenticated(): boolean {
    return this.user !== null;
  }
  logout() {
    this._firebaseAuth.auth.signOut().then(res => {
      this.userDetails = null;
      this.router.navigate(["/login"])
    }, err => {
      //console.error(err);
    });
  }
  emails() {
    return this.email || 'Email invalido';
  }
  // loginFacebook() {
  //   var provider = new firebase.auth.FacebookAuthProvider();
  //   provider.addScope('user_birthday');
  //   return this._firebaseAuth.auth.signInWithPopup(provider).then(function (result) {
  //     // This gives you a Facebook Access Token.
  //     var token = result.credential;
  //     // The signed-in user info.
  //     var user = result.user;
  //     console.log(user);
  //     this.user = result.user;
  //   });
  // }
  uploadFotoPerfil(obj) {
    return this._firebaseAuth.auth.currentUser.updateProfile({ displayName: obj.nome, photoURL: obj.foto }).then(res => {
      console.log('foto atualizada');
    }).catch(() => {
      console.log(obj);
    })
  }

}
