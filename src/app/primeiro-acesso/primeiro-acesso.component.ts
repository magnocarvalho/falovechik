import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Usuario } from '../models/usuario.model';
import { ApiService } from '../services/api.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Select2OptionData } from 'ng2-select2';
declare var $: any;


export function removeSpaces(control: AbstractControl) {
  if (control && control.value && !control.value.replace(/\s/g, '').length) {
    control.setValue('');
  }
  return null;
}

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
    filiados: new FormControl(),
    username: new FormControl('', [Validators.required, removeSpaces]),
  });

  public exampleData: Array<Select2OptionData>;
  // public startValue: Observable<string>;

  constructor(private auth: AuthService, public api: ApiService) { }

  ngOnInit() {
    this.api.getUsuarios().subscribe(res => {
      this.exampleData = res;
      console.log(this.exampleData);
    });
  }
  displayFn(user?: Usuario): string | undefined {
    return user ? user.nome : undefined;
  }

  private _filter(nome: string): Usuario[] {
    const filterValue = nome.toLowerCase();

    return this.options.filter(option => option.nome.toLowerCase().indexOf(filterValue) === 0);
  }
  salvarRole() {
    let user = this.auth.userDetails;
    this.auth.spinner.show();
    if (!this.form.valid) {
      this.form.markAsDirty();
      this.auth.spinner.hide();
      console.error(this.form.errors);
      return;
    }

    let obj = {
      email: user.email,
      nome: this.form.get('nome').value,
      sobrenome: this.form.get('sobrenome').value,
      cpf: this.form.get('cpf').value,
      uid: user.uid,
      username: this.form.get('username').value
      // pai
    };


    // console.log(obj);
    this.api.createUsuario(obj).subscribe(res => {
      // alert('salvo com sucesso');
      this.auth.spinner.hide();
    }, err => {
      console.error(err);
      this.auth.spinner.hide();
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
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.imgTemporaria = myReader.result;
    }
    myReader.readAsDataURL(file);
  }

}
