import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Usuario } from '../models/usuario.model';
import { ApiService } from '../services/api.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-primeiro-acesso',
  templateUrl: './primeiro-acesso.component.html',
  styleUrls: ['./primeiro-acesso.component.css']
})
export class PrimeiroAcessoComponent implements OnInit {

  // public nome = this.auth.userDetails.email;
  public foto = true;
  public downloadURL;
  public imgTemporaria;
  usuarios: Usuario;
  options: Usuario[];
  filteredOptions: Observable<Usuario[]>;
  form = new FormGroup({
    nome: new FormControl("", Validators.required),
    sobrenome: new FormControl("", Validators.required),
    cpf: new FormControl("", Validators.required),
    filiados: new FormControl()
  });

  constructor(private auth: AuthService, public api: ApiService) { }

  ngOnInit() {
    // this.api.getUsuarios().subscribe(r => {
    //   this.options = r;
    //   this.filteredOptions = this.form.get('filiados').valueChanges
    //   .pipe(
    //     startWith<string | Usuario>(''),
    //     map(value => typeof value === 'string' ? value : value.nome),
    //     map(nome => nome ? this._filter(nome) : this.options.slice())
    //   );
    // });
  }
  displayFn(user?: Usuario): string | undefined {
    return user ? user.nome : undefined;
  }

  private _filter(nome: string): Usuario[] {
    const filterValue = nome.toLowerCase();

    return this.options.filter(option => option.nome.toLowerCase().indexOf(filterValue) === 0);
  }


  salvarRole() {
    // console.log(this.form.value);
    let user = this.auth.userDetails;
    debugger;
    let obj = {
      email: user.email,
      nome: this.form.get('nome').value,
      sobrenome: this.form.get('sobrenome').value,
      cpf: this.form.get('cpf').value,
      uid: user.uid,
    };


    console.log(obj);
    this.api.createUsuario(obj).subscribe(res => {
      debugger;
      alert('salvo com sucesso');
    })

  }
  upload(event) {
    debugger;
    this.readThis(event.target);
    // this.imgTemporaria = event.target.files[0];
    //   let storageRef = this.firebase.ref('/upload/' + this.user.userDetails.uid );
    //  this.firebase.upload(storageRef,  )
  }
  readThis(inputValue: any): void {
    var file:File = inputValue.files[0];
    var myReader:FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.imgTemporaria = myReader.result;
    }
    myReader.readAsDataURL(file);
  }

}
