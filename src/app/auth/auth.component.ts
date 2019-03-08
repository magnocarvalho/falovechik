import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(public auth: AuthService, public route: Router) { }

  ngOnInit() {
  }
  form = new FormGroup({
    email: new FormControl("", Validators.email),
    senha: new FormControl("", Validators.required),
  })
  logar($) {
    $.preventDefault();
    var obj = {
      email: this.form.get("email").value,
      senha: this.form.get("senha").value
    };
    this.auth.login(obj).then(
      () => {
        console.log("deu bom!!!");
        this.route.navigate(["dashboard"]);
      },
      err => {
        console.log(err);
      }
    );
  }

}
