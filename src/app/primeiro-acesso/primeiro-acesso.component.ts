import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Usuario } from '../models/usuario.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-primeiro-acesso',
  templateUrl: './primeiro-acesso.component.html',
  styleUrls: ['./primeiro-acesso.component.css']
})
export class PrimeiroAcessoComponent implements OnInit {

  usuarios: Usuario[];
  form = new FormGroup({
    nome: new FormControl("", Validators.required),
    sobrenome: new FormControl("", Validators.required),
    cpf: new FormControl("", Validators.required),
  });

  constructor(private auth: AuthService, public api: ApiService) { }

  ngOnInit() {
   
  }

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
    this.api.getUsuarios().subscribe(data =>
      {
        this.usuarios = data.map(e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          } as Usuario;
        });
      });

    console.log(obj);
    console.log(this.usuarios);

  }

}
