import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: Http, private router: Router) { }
  URL = environment.url;
  userData: {
    name: string,
    email: String,
    token: string
  };
  public doLogin(id) {
    return this.doRequest('post', 'login', { token: id });
  }
  public doRequest(method: 'post' | 'put' | 'delete' | 'get', url, data: any = null): Observable<any> {
    return new Observable(obs => {
      this.request(method, url, data, obs);
    })
  }

  private request(method: 'post' | 'put' | 'delete' | 'get', url, data: any = null, obs) {
    let headers = new Headers({ 'x-access-token': this.userData ? this.userData.token : '' });
    let options = new RequestOptions({ headers: headers });
    if (!data) {
      data = {};
    }
    var callback = res => {
      if (res.status === 444) {
        return;
      }
      if (res.status < 200 || res.status >= 300) {
        obs.error(res);
      }
      else {
        obs.next(res);
      }
      obs.complete();
    };
    if (method == 'get' && data) {
      options.params = data;
    }
    if (method == "get" || method == "delete") {
      this.http[method](this.URL + url, options).subscribe(callback, callback);
    }
    else
      this.http[method](this.URL + url, data, options).subscribe(callback, callback);
  }
  salvarPesquisa(obj) {
    return this.doRequest('post', 'atualizarPesquisa', obj);
  }
  criarPesquisa(obj) {
    return this.doRequest('post', 'criarPesquisa', obj);
  }
  atualizarPesquisa(obj) {
    return this.doRequest('put', 'atualizarPesquisa', obj);
  }
  postBlogByID(blog){
    return this.doRequest('get', 'blog/' + blog);
  }
  postBlog(){
    return this.doRequest('get', 'posts');
  }

  
}
