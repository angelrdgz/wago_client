import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs"

interface Res {
  data:any;
}

@Injectable()

export class ApiProvider {

  url = "http://127.0.0.1:8000/api/v1";
  public token: Observable<string>;
  httpOptions: Observable<any>;
  authenticated = false;
  message = '';

  constructor(public http: HttpClient) { }

  login(data) {
    return new Promise(resolve => {
      this.http.post(this.url + '/auth/login', data).subscribe((data:any) => {
        resolve(data);
      },
        err => {
          resolve(err);
        });
    });
  }

  register(data) {
    return new Promise(resolve => {
      this.http.post(this.url + '/auth/register', data).subscribe((data:any) => {
        resolve(data);
      },
        err => {
          resolve(err);
        });
    });
  }

  logout() {
    return new Promise(resolve => {
      this.http.get(this.url + '/auth/logout',{}).subscribe((data:any) => {
        resolve(data);
      },
        err => {
          console.log(err);
        });
    });
  }

  getPets(){
      return new Promise(resolve => {
        this.http.get<Res>(this.url+'/pets').subscribe((data:any) => {
          resolve(data);
          }, 
        err => {
        console.log(err);
        });
      });
  }

  getPet(id){
    return new Promise(resolve => {
      this.http.get<Res>(this.url+'/pets/'+id).subscribe((data:any) => {
        resolve(data);
        }, 
      err => {
      console.log(err);
      });
    });
}


}