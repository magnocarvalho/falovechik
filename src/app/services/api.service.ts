import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  // Define API
  apiURL = environment.url;
  tokensecreto;
  httpOptions= {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, public auth: AuthService) {
    this.tokensecreto = this.auth.isLoggedIn() ? this.auth.userDetails.getIdToken() : 'token';
    this.httpOptions.headers.append('x-access-token', this.tokensecreto); 
   }
   

  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/

  // Http Options
 

  // HttpClient API get() method => Fetch Usuarios list
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiURL + '/usuarios')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API get() method => Fetch Usuario
  getUsuario(id): Observable<Usuario> {
    return this.http.get<Usuario>(this.apiURL + '/usuarios/' + id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API post() method => Create Usuario
  createUsuario(Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiURL + '/usuarios', JSON.stringify(Usuario), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API put() method => Update Usuario
  updateUsuario(id, Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(this.apiURL + '/usuarios/' + id, JSON.stringify(Usuario), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API delete() method => Delete Usuario
  deleteUsuario(id){
    return this.http.delete<Usuario>(this.apiURL + '/usuarios/' + id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // Error handling
  handleError(error) {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     window.alert(errorMessage);
     return throwError(errorMessage);
  }

}
