import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ApiProvider } from  './../../providers/api/api';

import { MapPage } from '../map/map';

import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';
import { RegisterPage } from '../register/register';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loader:any;
  public user = {email:"angelrodriguez@ucol.mx", password:"Hola1@"}

  constructor(
    public navCtrl: NavController,
    public apiProvider: ApiProvider,
    public loadingCtrl: LoadingController,
    private storage: Storage
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  presentLoading(text) {
    this.loader = this.loadingCtrl.create({
      content: text,
    });
    this.loader.present();
  }

  login(){

    this.presentLoading("Iniciando Sesión");

    this.apiProvider.login(this.user).then((data:any) => {
      this.storage.set('wago_token', data.token);
      this.storage.set('wago_user', JSON.stringify(data.user));
      this.loader.dismiss();
      this.navCtrl.setRoot(MapPage);
    });
  	 
  }

  goToRegister(){
    this.navCtrl.setRoot(RegisterPage)
  }

}
