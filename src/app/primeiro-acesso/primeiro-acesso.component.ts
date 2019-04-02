import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Usuario } from '../models/usuario.model';
import { ApiService } from '../services/api.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Select2OptionData } from 'ng2-select2';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
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
  uploadPercent: Observable<number>;
  public imgTemporaria;
  downloadURL: Observable<string>;
  task: AngularFireUploadTask;
  complete: boolean;
  caminhoImagem: string;
  usuarios: Usuario;
  options: Usuario[];
  filteredOptions: Observable<Usuario[]>;
  form = new FormGroup({
    nome: new FormControl("", Validators.required),
    sobrenome: new FormControl("", Validators.required),
    cpf: new FormControl("", Validators.required),
    filiados: new FormControl(),
    username: new FormControl('', [Validators.required, removeSpaces]),
    // pai: new FormControl('', Validators.required)
  });

  public exampleData: Array<Select2OptionData>;
  // public startValue: Observable<string>;

  constructor(private storage: AngularFireStorage, private auth: AuthService, public api: ApiService, public tubarao: MatSnackBar, public router: Router) { }

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
    if (!this.caminhoImagem) {
      this.tubarao.open('faltou sua foto de perfil!')
      return;
    }

    let obj = {
      email: user.email,
      nome: this.form.get('nome').value,
      sobrenome: this.form.get('sobrenome').value,
      cpf: this.form.get('cpf').value,
      uid: user.uid,
      username: this.form.get('username').value,
      // pai: this.form.get('pai').value,
      foto: this.caminhoImagem,
    };
    this.auth.uploadFotoPerfil({nome: obj.nome,foto: obj.foto});
    // console.log(obj);
    this.api.createUsuario(obj).subscribe(res => {
      // alert('salvo com sucesso');
      this.router.navigate(['dashboard']);
      this.auth.spinner.hide();
    }, err => {
      console.error(err);
      this.auth.spinner.hide();
      this.tubarao.open('erro');
    })
  }
  deleteImgTemporaria(event) {
    event.preventDefault();
    this.imgTemporaria = undefined;
  }

  upload(event) {
    this.readThis(event.target);
    this.complete = false;
    const file = event.target.files[0];
    const path = `imagens/${this.auth.userDetails.uid}/${file.name}`;
    const fileRef = this.storage.ref(path.replace(/\s/g, ''));
    this.task = this.storage.upload(path.replace(/\s/g, ''), file);
    this.task.then(up => {
      fileRef.getDownloadURL().subscribe(url => {
        this.complete = true;
        this.caminhoImagem = url;
        console.log(url);
      })
    })
    this.uploadPercent = this.task.percentageChanges();
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
