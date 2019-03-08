import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.css']
})
export class NovoUsuarioComponent implements OnInit {

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
    this.auth.createUser(obj).then(
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
