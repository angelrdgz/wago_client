import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from './services/authentication.service';
import { ApiProvider } from  './services/api.service';

import { NavController, Platform, LoadingController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public user:any;
  loader:any;
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'Mapa',
      url: '/map',
      icon: 'map'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    public navCtrl: NavController,
    private authenticationService: AuthenticationService,
    private router: Router,
    public apiProvider: ApiProvider,
    public loadingCtrl: LoadingController,
  ) {

    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.authenticationService.authenticationState.subscribe(state => {
        if (state) {
          this.storage.get('wago_user').then(res => {
            console.log(res)
              this.user = JSON.parse(res);
          })
          this.router.navigate(['map']);
        } else {
          this.router.navigate(['login']);
        }
      });
    });
  }

  async presentLoading(msg) {
    this.loader = await this.loadingCtrl.create({
      message: msg,
    });
    this.loader.present();
  }

  logout() {

    this.presentLoading("Cerrando Sesión");
    this.apiProvider.logout().then(data => {
      this.storage.clear();
      console.log(data);
      this.loader.dismiss();
      this.navCtrl.navigateRoot('/');
    });
  }
}
