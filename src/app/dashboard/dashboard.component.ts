import { AuthService } from "./../services/auth.service";
import { Component, OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireStorage } from 'angularfire2/storage';
// import { FirebaseStorage } from "@angular/fire";
// import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  public nome = this.auth.auth.currentUser.email;
  public foto = true;
  public downloadURL;
  public imgTemporaria;
  constructor(
    public spinner: NgxSpinnerService,
    public auth: AngularFireAuth,
    public user: AuthService,
    public afStorage: AngularFireStorage
  ) { }

  ngOnInit() {
    if (this.auth.auth.currentUser.photoURL) {
      // this.downloadURL = this.afStorage.ref('assets/img/profile.png').getDownloadURL();
    }
    else {
      this.foto = false;
    }

    this.spinner.show();
  }
  ngAfterViewChecked(): void {
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.
    this.spinner.hide();
  }


  // fazerLoginFace()
  // {
  //   this.user.loginFacebook().then(res =>{
  //     console.log(res);
  //     this.foto = false;
  //   });
  // }
}
