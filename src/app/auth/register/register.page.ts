import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, AlertController  } from '@ionic/angular';
import { ApiProvider } from  '../../services/api.service';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  loader:any;
  user:any = {email:'', name:'', lastname:'', password:'', password_confirmation:''}

  constructor(
    public navCtrl: NavController,
    public apiProvider: ApiProvider,
    public alertController: AlertController,
    public loadingCtrl: LoadingController,
    private storage: Storage
  ) { }

  ngOnInit() {
    console.log('ionViewDidLoad RegisterPage');
  }

  async presentLoading(msg) {
    this.loader = await this.loadingCtrl.create({
      message: msg,
    });
    await this.loader.present();
  }

  async presentAlert(title, message) {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  register(){

    this.presentLoading("Iniciando Sesión");

    this.apiProvider.register(this.user).then((data:any) => {
      console.log(data)
      this.storage.set('wago_token', data.token);
      this.storage.set('wago_user', JSON.stringify(data.user));
      this.loader.dismiss();
      this.navCtrl.navigateRoot('/map');
    });
  	 
  }

}
