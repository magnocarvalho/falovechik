import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'falovechik';
  constructor(public auth: AuthService) { }
  ngOnInit() {
    /** spinner starts on init */  
  }
  sairLogin() {
    this.auth.logout();
  }
}
