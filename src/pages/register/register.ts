import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ApiProvider } from  './../../providers/api/api';

import { MapPage } from '../map/map';

import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  loader:any;
  user:any = {email:'', name:'', lastname:'', password:'', password_confirmation:''}

  constructor(
    public navCtrl: NavController,
    public apiProvider: ApiProvider,
    public loadingCtrl: LoadingController,
    private storage: Storage
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  presentLoading(text) {
    this.loader = this.loadingCtrl.create({
      content: text,
    });
    this.loader.present();
  }

  register(){

    this.presentLoading("Iniciando Sesión");

    this.apiProvider.register(this.user).then((data:any) => {
      console.log(data)
      this.storage.set('wago_token', data.token);
      this.storage.set('wago_user', JSON.stringify(data.user));
      this.loader.dismiss();
      this.navCtrl.setRoot(MapPage);
    });
  	 
  }

}
