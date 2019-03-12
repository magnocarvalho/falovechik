import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor( public spinner: NgxSpinnerService, public auth: AngularFireAuth) { }

  ngOnInit() {
    this.spinner.show();
  }
  ngAfterViewChecked(): void {
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.
    this.spinner.hide();
  }
  nome = this.auth.auth.currentUser.email;

  

}
