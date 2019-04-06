import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from './services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { NavigationStart, Router, NavigationEnd, Event, NavigationError } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'falovechik';
  flagLogin = false;
  constructor(public auth: AuthService, public router: Router, public fireAuth: AngularFireAuth, public spinner: NgxSpinnerService) {
    this.spinner.show();
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        // Show loading indicator
        this.spinner.show();
      }
      if (event instanceof NavigationEnd) {
        // Hide loading indicator

        if (this.usuarioLogado()) {
          this.flagLogin = true;
        } else {
          this.flagLogin = false;
          this.title = 'Gastando Pouco!';
        }
        this.spinner.hide();
      }

      if (event instanceof NavigationError) {
        // Hide loading indicator
        this.spinner.hide();
        // Present error to user
        console.log(event.error);
      }
    });
  }
  ngOnInit() {
    /** spinner starts on init */

  }
  ngAfterViewInit(): void {
    this.spinner.hide();
  }
  sairLogin() {
    this.auth.logout();
  }
  usuarioLogado(): boolean {
    return this.auth.isLoggedIn();
  }
}
