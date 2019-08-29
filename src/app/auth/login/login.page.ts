import { Component, OnInit } from '@angular/core';
import { ApiProvider } from '../../services/api.service';
import { Storage } from '@ionic/storage';
import { LoadingController, NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loader: any;
  user: any = { email: '', password: '' }

  constructor(
    public navCtrl: NavController,
    public api: ApiProvider,
    public loadingCtrl: LoadingController,
    private storage: Storage,
    public alertController: AlertController
  ) { }


  ngOnInit() {
  }

  async presentLoading(msg) {
    this.loader = await this.loadingCtrl.create({
      message: msg,
    });
    this.loader.present();
  }

  async presentAlert(title, message) {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: ['OK']
    });

    alert.present();
  }

  login() {

    this.presentLoading("Iniciando Sesión");

    this.api.login(this.user).then((data: any) => {
      if (data.status != null) {
        if (data.status == 422) {
          this.loader.dismiss();
          //this.presentAlert('Error', 'Email o contraseña incorrectos')
        }
      }

      this.storage.set('wago_token', data.token);
      this.storage.set('wago_user', JSON.stringify(data.user));
      this.loader.dismiss();
      this.navCtrl.navigateRoot('/map');


    });

  }

}
