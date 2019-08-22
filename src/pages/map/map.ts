import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google:any;
@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  @ViewChild('map') mapRef: ElementRef;
  public map:any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public geolocation: Geolocation) {
  }

  ionViewDidLoad() {
    console.log(this.mapRef);
    this.showMap();
  }
  showMap(){

    this.geolocation.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      const mapOptions = {
        center:latLng,
        zoom: 18,
        mapTypeControl:false,
        fullscreenControl:false,
        streetViewControl:false,
      }

      this.map = new google.maps.Map(this.mapRef.nativeElement, mapOptions);

    }, (err) => {
      console.log(err);
    });
  }

}
