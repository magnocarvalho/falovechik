import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public nome = this.auth.auth.currentUser.email;
  public foto = true;
  constructor( public spinner: NgxSpinnerService, public auth: AngularFireAuth, public user: AuthService) { }

  ngOnInit() {
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
