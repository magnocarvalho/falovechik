import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';
import { Select2OptionData } from 'ng2-select2';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  // Define API
  apiURL = environment.url;
  tokensecreto;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, public auth: AuthService) {
    this.tokensecreto = this.auth.isLoggedIn() ? this.auth.userDetails.getIdToken() : 'tokenfraco';
    this.httpOptions.headers.append('x-access-token', this.tokensecreto);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    const authToken = this.tokensecreto;
    this.auth.spinner.show();
 
    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = req.clone({
      headers: req.headers.set('Authorization', authToken)
    });
 
    // send cloned request with header to the next handler.
    this.auth.spinner.hide();
    return next.handle(authReq);
  }


  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/

  // Http Options


  // HttpClient API get() method => Fetch Usuarios list
  getUsuarios(): Observable<Array<Select2OptionData>> {
    return this.http.get<Array<Select2OptionData>>(this.apiURL + '/usuarios')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }


  // HttpClient API get() method => Fetch Usuario
  public getUsuario(id): Observable<Usuario> {
    return this.http.get<Usuario>(this.apiURL + '/usuarios/' + id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  login(id): Observable<Usuario> {
    return this.http.put<Usuario>(this.apiURL + '/login/', { email: id }, this.httpOptions)
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
  deleteUsuario(id) {
    return this.http.delete<Usuario>(this.apiURL + '/usuarios/' + id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // Error handling
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}
