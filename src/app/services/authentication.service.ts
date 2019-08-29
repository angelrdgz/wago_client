import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs"
 
const TOKEN_KEY = 'auth-token';
 
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
 
  authenticationState = new BehaviorSubject(false);
 
  constructor(
    private storage: Storage, 
    private plt: Platform,
    public http: HttpClient) { 
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }
 
  checkToken() {
    this.storage.get('wago_token').then(res => {
      if (res) {
        this.authenticationState.next(true);
      }
    })
  }
 
  isAuthenticated() {
    return this.authenticationState.value;
  }
 
}