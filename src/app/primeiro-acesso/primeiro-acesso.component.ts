import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-primeiro-acesso',
  templateUrl: './primeiro-acesso.component.html',
  styleUrls: ['./primeiro-acesso.component.css']
})
export class PrimeiroAcessoComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }
  form = new FormGroup({
    nome: new FormControl("", Validators.required),
    sobrenome: new FormControl("", Validators.required),
    cpf: new FormControl("", Validators.required),
  });
  salvarRole() {
    console.log(this.form.value);
    let user = this.auth.userDetails;;
    debugger;
    let obj = {
      email: user.email,
      nome: this.form.get('nome').value,
      sobrenome: this.form.get('sobrenome').value,
      cpf: this.form.get('cpf').value,
      uid: user.uid,
    };

    console.log(obj);

  }

}
