import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from './services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'falovechik';
  constructor(public auth: AuthService, public fireAuth: AngularFireAuth, public spinner: NgxSpinnerService) { }
  ngOnInit() {
    /** spinner starts on init */  
    this.fireAuth.authState
  }
  sairLogin() {
    this.auth.logout();
  }
}
